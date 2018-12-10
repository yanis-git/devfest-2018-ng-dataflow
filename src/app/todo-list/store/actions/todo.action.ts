import { Action } from '@ngrx/store';
import {Todo} from '../../models/Todo';

export const TODO_ADD_ACTION = '[todo] add new todo';
export const TODO_REMOVE_ACTION = '[todo] remove existing todo';
export const TODO_COMPLETE_ACTION = '[todo] switch todo to complete state';


export class AddTodoAction implements Action {
  readonly type = TODO_ADD_ACTION;
  constructor(public payload: Todo) { }
}

export class RemoveTodoAction implements Action {
  readonly type = TODO_REMOVE_ACTION;
  constructor(public payload: Todo) { }

}

export class CompleteTodoAction implements Action {
  readonly type = TODO_COMPLETE_ACTION;
  constructor(public payload: Todo) { }
}

export type TodoAction = AddTodoAction | RemoveTodoAction | CompleteTodoAction;
