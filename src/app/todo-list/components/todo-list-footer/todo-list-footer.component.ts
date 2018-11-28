import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-todo-list-footer',
  templateUrl: './todo-list-footer.component.html',
  styleUrls: ['./todo-list-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListFooterComponent {
  @Input() countTodo: number;
}
