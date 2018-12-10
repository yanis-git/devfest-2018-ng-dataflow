import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoListService } from '../services/todo-list.service';
import {Todo} from '../models/Todo';
import {UserService} from '../services/user.service';
import {StoreService} from '../services/store.service';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {CurrentUserService} from '../services/current-user.service';
import {select, Store} from '@ngrx/store';
import {State, TodoListState} from '../store/models/store';
import {filteredTodos, selectAll, users} from '../store/reducers';
import {AddTodoAction, CompleteTodoAction, RemoveTodoAction} from '../store/actions/todo.action';
import {CurrentUserSwitchAction} from '../store/actions/current-user.action';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoListService, UserService, StoreService, CurrentUserService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  todosByUser$: Observable<Todo[]>;
  users$: Observable<User[]>;
  todosCount$: Observable<number>;

  constructor(
    public todoService: TodoListService,
    public storeService: StoreService,
    public store: Store<TodoListState>
  ) { }

  ngOnInit() {
    this.todosByUser$ = this.store.pipe(select<TodoListState, Todo[]>(filteredTodos));
    this.users$ = this.store.pipe(select<TodoListState, User[]>(users));
    this.todosCount$ = this.todosByUser$.pipe(map(todos => todos.length));
    // this.store.pipe(select<TodoListState, State>(selectAll)).subscribe(console.log);
    this.users$.subscribe(console.log);
  }

  onAddTodo(todo: Todo) {
    this.store.dispatch(new AddTodoAction(todo));
  }

  onRemoveTodo(todo: Todo) {
    this.store.dispatch(new RemoveTodoAction(todo));
  }

  onToggleTodoComplete(todo: Todo) {
    this.store.dispatch(new CompleteTodoAction(todo));
  }

  onUserChange(user: User) {
    this.store.dispatch(new CurrentUserSwitchAction(user.id));
  }
}
