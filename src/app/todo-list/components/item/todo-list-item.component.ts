import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {Todo, TodoState} from '../../models/Todo';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListItemComponent {

  @Input() todo: Todo;
  @Output() remove: EventEmitter<TodoState> = new EventEmitter();
  @Output() toggleComplete: EventEmitter<TodoState> = new EventEmitter();

  constructor() {  }

  toggleTodoComplete(todo: TodoState) {
    this.toggleComplete.emit(todo);
  }

  removeTodo(todo: TodoState) {
    this.remove.emit(todo);
  }
}
