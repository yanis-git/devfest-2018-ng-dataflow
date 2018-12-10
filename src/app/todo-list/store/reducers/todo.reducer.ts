import {TODO_ADD_ACTION, TODO_COMPLETE_ACTION, TODO_REMOVE_ACTION, TodoAction} from '../actions/todo.action';
import {todoEntities, TodoState} from '../../models/Todo';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface TodoEntity extends EntityState<TodoState> {}
export const todoAdapter: EntityAdapter<TodoState> = createEntityAdapter<TodoState>();
export const todoInitialState: TodoEntity = todoAdapter.getInitialState(todoEntities);


export function todoReducer(
  state: TodoEntity = todoInitialState,
  action: TodoAction
): TodoEntity {
  switch (action.type) {
    case TODO_ADD_ACTION:
      return todoAdapter.addOne(Object.assign(action.payload, {user: action.payload.user.id}), state);
    case TODO_REMOVE_ACTION:
      return todoAdapter.removeOne(action.payload.id, state);
    case TODO_COMPLETE_ACTION:
      return todoAdapter.updateOne({id: action.payload.id, changes: {complete: !action.payload.complete}}, state);
  }
  return state;
}
