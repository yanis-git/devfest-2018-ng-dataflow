import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoListService } from '../services/todo-list.service';
import {Todo} from '../models/Todo';
import {UserService} from '../services/user.service';
import {StoreService} from '../services/store.service';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {map} from 'rxjs/operators';
import {CurrentUserService} from '../services/current-user.service';


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
    public storeService: StoreService
  ) { }

  ngOnInit() {
    this.todosByUser$ = this.storeService.filteredTodo$;
    this.users$ = this.storeService.select<User[]>(['users']);
    this.todosCount$ = this.todosByUser$.pipe(map(todos => todos.length));
  }

  onAddTodo(todo: Todo) {
    this.storeService.dispatch({
      type: 'todo_add',
      payload: this.storeService.fromNestedToFlat(todo)
    });
  }

  onRemoveTodo(todo: Todo) {
    this.storeService.dispatch({
      type: 'todo_remove',
      payload: todo
    });
  }

  onToggleTodoComplete(todo: Todo) {
    this.storeService.dispatch({
      type: 'todo_complete',
      payload: todo
    });
  }

  onUserChange(user: User) {
    this.storeService.dispatch({
      type: 'set_current_user',
      payload: user.id
    });
  }
}
