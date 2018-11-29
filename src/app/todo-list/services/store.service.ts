import {Injectable} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {UserService} from './user.service';
import {Observable, combineLatest, Subject, BehaviorSubject, merge, of} from 'rxjs';
import {FlatStore, State} from '../store/store';
import {distinctUntilChanged, map, pluck} from 'rxjs/operators';
import {TodoState, Todo, todosState} from '../models/Todo';
import {User, usersState} from '../models/User';
import {CurrentUserService} from './current-user.service';

export interface Action {
  type: string;
  payload?: User | Todo | TodoState | number;
}

@Injectable()
export class StoreService {

  private _actions$: Subject<Action>;
  private _store$: BehaviorSubject<FlatStore>;
  private _store: FlatStore;

  constructor(
    private todoService: TodoListService,
    private userService: UserService,
    private currentUserService: CurrentUserService
  ) {
    this._actions$ = new Subject();
    this._store = this.getDefaultValue();
    this._store$ = new BehaviorSubject<FlatStore>(this._store);

    this.bindMiddleware();
  }

  select<T>(names: string[]): Observable<T> {
    return this.store$.pipe(pluck<State, T>(...names), distinctUntilChanged());
  }

  dispatch(action: Action) {
    this._actions$.next(action);
  }

  get filteredTodo$(): Observable<Todo[]> {
    return combineLatest(
      this.store$.pipe(pluck<State, Todo[]>('todos'), distinctUntilChanged()),
      this.store$.pipe(pluck<State, number>('currentUser'), distinctUntilChanged())
    ).pipe(map(state => {
        return state[0].filter(todo => todo.user.id === state[1]);
      }));
  }

  get store$(): Observable<State> {
    return this._store$.pipe(map(flat => {
      return Object.assign({}, flat, {
        todos: this.getNestedUsers(flat.users, flat.todos)
      });
    }));
  }

  get actions$(): Observable<Action> {
    return this._actions$.asObservable();
  }

  private getNestedUsers(users: User[], todos: TodoState[]): Todo[] {
    return todos.map(todo => {
      return Object.assign({}, todo, {
        user: users.find(user => user.id === todo.user)
      });
    });
  }

  public fromNestedToFlat(todo: Todo): TodoState {
    return {
      id: todo.id,
      title: todo.title,
      complete: todo.complete,
      user: todo.user.id
    };
  }

  private getDefaultValue(): FlatStore {
    return {
      users: usersState,
      todos: todosState,
      currentUser: 1
    };
  }

  private reduce(state: FlatStore, action: Action): FlatStore {
    return {
      users : this.userService.reduce(state.users, action),
      todos: this.todoService.reduce(state.todos, action),
      currentUser: this.currentUserService.reduce(state.currentUser, action)
    };
  }

  private hasChange(newState: FlatStore): boolean {
    let hasChange = false;

    for (let index in newState ) {
      if (this._store[index] !== newState[index]) {
        hasChange = true;
      }
    }
    return hasChange;
  }

  private bindMiddleware() {
    merge(this.actions$, of({type: 'INIT'})).subscribe(action => {
      const newStore = this.reduce(this._store, action);
      if (this.hasChange(newStore)) {
        this._store = newStore;
        this._store$.next(newStore);
      }
    });
  }
}
