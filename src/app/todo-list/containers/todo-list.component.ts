import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TodoListService } from '../services/todo.service';
import { Todo } from '../models/Todo';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoListService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {

  constructor(public todoService: TodoListService) { }

  onAddTodo(todo: Todo) {
    this.todoService.add(todo);
  }

  onRemoveTodo(todo: Todo) {
    this.todoService.remove(todo);
  }

  onToggleTodoComplete(todo: Todo) {
    this.todoService.complete(todo);
  }
}
