import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './containers/todo-list.component';
import { TodoListHeaderComponent } from './components/header/todo-list-header.component';
import { TodoListFooterComponent } from './components/footer/todo-list-footer.component';
import { TodoListItemComponent } from './components/item/todo-list-item.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';


@NgModule({
  declarations: [
    TodoListComponent, 
    TodoListHeaderComponent,
    TodoListFooterComponent,
    TodoListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('todoList', reducers)
  ],
  exports: [
    TodoListComponent
  ]
})
export class TodoListModule { }
