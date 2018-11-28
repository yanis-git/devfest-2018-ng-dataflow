import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {distinctUntilChanged, find, map, mergeMap} from 'rxjs/operators';
import {User, usersState} from '../models/User';
import {isNullOrUndefined} from 'util';


@Injectable()
export class UserService {

  private _users$: BehaviorSubject<User[]>;
  private _users: User[];

  private _currentUser$: BehaviorSubject<number>;
  private _currentUser = 1;

  constructor() {
    this._users$ = new BehaviorSubject<User[]>(usersState);
    this._currentUser$ = new BehaviorSubject<number>(1);
    this._users = usersState;
  }

  get users$(): Observable<User[]> {
    return this._users$.asObservable().pipe(distinctUntilChanged());
  }

  get currentUser$(): Observable<number> {
    return this._currentUser$.asObservable().pipe(distinctUntilChanged());
  }

  findUser$(id: number): Observable<User> {
    return this.users$.pipe(mergeMap(users => {
      // let find it.
      const el = users.find(user => user.id === id);
      // If not exist, throw exception
      if (isNullOrUndefined(el)) {
        return throwError('user not find');
      } else {
        // return finded element.
        return of(el);
      }
    }));
  }

  setCurrent(id: number) {
    this._currentUser$.next(id);
  }
}
