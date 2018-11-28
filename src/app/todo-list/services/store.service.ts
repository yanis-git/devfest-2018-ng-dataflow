import {Injectable} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {UserService} from './user.service';
import {Observable, combineLatest} from 'rxjs';
import {State} from '../store/store';
import {distinctUntilChanged, map, pluck} from 'rxjs/operators';
import {TodoState, Todo} from '../models/Todo';
import {User} from '../models/User';



@Injectable()
export class StoreService {

  private _store$: Observable<State>;

  constructor(
    private todoService: TodoListService,
    private userService: UserService
  ) {
    this._store$ = this.combineStore();
  }

  select<T>(name: string): Observable<T> {
    return this._store$.pipe(pluck<State, T>(name), distinctUntilChanged());
  }

  private combineStore(): Observable<State> {
    return combineLatest(
      this.userService.users$,
      this.todoService.todos$,
      this.userService.currentUser$
    ).pipe(map(state => {
      return {
        users: state[0],
        todos: this.getNestedUsers(state[0], state[1]),
        currentUser: state[2]
      };
    }));
  }

  private getNestedUsers(users: User[], todos: TodoState[]): Todo[] {
    return todos.map(todo => {
      return Object.assign({}, todo, {
        user: users.find(user => user.id === todo.user)
      });
    });
  }

  get store$(): Observable<State> {
    return this._store$;
  }

  addTodo(todo: Todo) {
    this.todoService.add(this.fromNestedToFlat(todo));
  }

  removeTodo(todo: Todo) {
    this.todoService.remove(this.fromNestedToFlat(todo));
  }

  completeTodo(todo: Todo) {
    this.todoService.complete(this.fromNestedToFlat(todo));
  }

  changeUser(user: User) {
    this.userService.setCurrent(user.id);
  }

  private fromNestedToFlat(todo: Todo): TodoState {
    return {
      id: todo.id,
      title: todo.title,
      complete: todo.complete,
      user: todo.user.id
    };
  }

  selectFilterdTodo(): Observable<Todo[]> {
    return this._store$.pipe(map(state => {
      return state.todos.filter(todo => todo.user.id === state.currentUser);
    }));
  }
}
