import { Todo } from './../../models/Todo';
import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import {User} from '../../models/User';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListHeaderComponent implements OnInit {

  todo: Todo;
  currentId = 1;

  @Input() defaultTodo: Todo;
  @Input() users: User[];
  @Output() add: EventEmitter<Todo>;
  @Output() userChange: EventEmitter<User>;

  constructor() {
    this.add = new EventEmitter<Todo>();
    this.userChange = new EventEmitter<User>();
  }

  ngOnInit() {
    this.todo = this.todoFromFingerPrint();
  }

  addTodo() {
    this.todo.user = this.findUser(this.currentId);
    this.add.emit(this.todo);
    this.todo = this.todoFromFingerPrint();
  }

  onChange(change: Event) {
    this.userChange.emit(
      this.findUser(this.currentId)
    );
  }

  private findUser(id: number): User {
    return this.users.find(user => user.id == id);
  }

  private todoFromFingerPrint(): Todo {
    return Object.assign({}, this.defaultTodo);
  }
}
