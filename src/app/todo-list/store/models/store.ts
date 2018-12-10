import {User} from '../../models/User';
import {Todo, TodoState} from '../../models/Todo';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {UserEntity} from '../reducers/users.reducer';
import {TodoEntity} from '../reducers/todo.reducer';


export interface State {
  users: User[];
  todos: Todo[];
  currentUser: number;
}

export interface TodoListState {
  users: UserEntity;
  todos: TodoEntity;
  currentUser: number;
}

export interface FlatStore {
  users: User[];
  todos: TodoState[];
  currentUser: number;
}
