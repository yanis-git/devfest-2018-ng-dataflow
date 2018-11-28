import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoListService } from '../services/todo-list.service';
import {Todo} from '../models/Todo';
import {UserService} from '../services/user.service';
import {StoreService} from '../services/store.service';
import {Observable} from 'rxjs';
import {User} from '../models/User';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoListService, UserService, StoreService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  todosByUser$: Observable<Todo[]>;

  constructor(
    public todoService: TodoListService,
    public userService: UserService,
    public storeService: StoreService
  ) { }

  ngOnInit() {
    this.todosByUser$ = this.storeService.selectFilterdTodo();
  }

  onAddTodo(todo: Todo) {
    this.storeService.addTodo(todo);
  }

  onRemoveTodo(todo: Todo) {
    this.storeService.removeTodo(todo);
  }

  onToggleTodoComplete(todo: Todo) {
    this.storeService.completeTodo(todo);
  }

  onUserChange(user: User) {
    this.storeService.changeUser(user);
  }
}
