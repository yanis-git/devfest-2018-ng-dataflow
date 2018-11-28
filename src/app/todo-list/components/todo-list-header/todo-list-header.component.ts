import { Todo } from './../../models/Todo';
import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListHeaderComponent implements OnInit {

  todo: Todo;

  @Input() defaultTodo: Todo;
  @Output() add: EventEmitter<Todo>;

  constructor() {
    this.add = new EventEmitter<Todo>();
  }

  ngOnInit() {
    this.todo = this.todoFromFingerPrint();
  }

  addTodo() {
    this.add.emit(this.todo);
    this.todo = this.todoFromFingerPrint();
  }

  private todoFromFingerPrint(): Todo {
    return Object.assign({}, this.defaultTodo);
  }
}
