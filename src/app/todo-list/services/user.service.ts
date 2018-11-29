import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {distinctUntilChanged, find, map, mergeMap} from 'rxjs/operators';
import {User, usersState} from '../models/User';
import {isNullOrUndefined} from 'util';
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
