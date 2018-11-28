import { Todo } from './../model/Todo';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListItemComponent {

  @Input() todo: Todo;
  @Output() remove: EventEmitter<Todo> = new EventEmitter();
  @Output() toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor() {  }

  toggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }

  removeTodo(todo: Todo) {
    this.remove.emit(todo);
  }
}
