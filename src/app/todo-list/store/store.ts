import {User} from '../models/User';
import {Todo} from '../models/Todo';


export interface State {
  users: User[];
  todos: Todo[];
  currentUser: number;
}
