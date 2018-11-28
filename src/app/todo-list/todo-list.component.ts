import { Todo } from './../model/Todo';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoListService } from '../service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoListService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  constructor(public todoService: TodoListService) { }
  ngOnInit() {  }

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
