import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {ReducerAbstract} from './reducer.abstract';
import {Action} from './store.service';


@Injectable()
export class UserService extends ReducerAbstract {

  constructor() {
    super();
  }

  reduce(state: User[], action: Action): User[] {
    return state;
  }
}
