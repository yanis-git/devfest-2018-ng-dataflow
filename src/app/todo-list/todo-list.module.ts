import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';
import { TodoListHeaderComponent } from '../todo-list-header/todo-list-header.component';
import { TodoListFooterComponent } from '../todo-list-footer/todo-list-footer.component';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

@NgModule({
  declarations: [TodoListComponent, TodoListHeaderComponent, TodoListFooterComponent, TodoListItemComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TodoListComponent
  ]
})
export class TodoListModule { }
