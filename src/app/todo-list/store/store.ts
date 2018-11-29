import {User} from '../models/User';
import {Todo, TodoState} from '../models/Todo';


export interface State {
  users: User[];
  todos: Todo[];
  currentUser: number;
}


export interface FlatStore {
  users: User[];
  todos: TodoState[];
  currentUser: number;
}