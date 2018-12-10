import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TodoListState, State} from '../models/store';
import {currentUserReducer} from './current-user.reducer';
import {todoReducer} from './todo.reducer';
import {userReducer} from './users.reducer';
import {User} from '../../models/User';


export const reducers: ActionReducerMap<TodoListState> = {
  users: userReducer,
  todos: todoReducer,
  currentUser: currentUserReducer
};



export const todoState = createFeatureSelector<TodoListState>('todoList');
/**
 * From entity mapping to nested object ! :)
 */
export const selectAll = createSelector(todoState, ( state: TodoListState ) => {
  const users = Object.values(state.users.entities) as User[];
  return {
    users,
    currentUser: state.currentUser,
    todos: Object.values(state.todos.entities).map(todo => {
      return {
        ...todo,
        user: users.find(user => user.id === todo.user)
      };
    })
  };
});


export const filteredTodos = createSelector(selectAll, (state: State) => {
  return state.todos.filter(todo => todo.user.id === state.currentUser);
});


export const users = createSelector(selectAll, (state: State) => {
  return state.users;
});
