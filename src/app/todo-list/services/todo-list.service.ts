import { Injectable } from '@angular/core';
import {TodoState} from '../models/Todo';
import {ReducerAbstract} from './reducer.abstract';
import {Action} from './store.service';
import {isNumber} from 'util';

@Injectable()
export class TodoListService extends ReducerAbstract {

    constructor() {
        super();
    }
    reduce(state: TodoState[], action: Action): TodoState[] {
        switch (action.type) {
          case 'todo_add':
              return this.add(state, (action.payload as TodoState));

          case 'todo_remove':
            return this.remove(state, (action.payload as TodoState));

          case 'todo_complete':
            return this.complete(state, (action.payload as TodoState));

          default:
              return state;
        }
    }

    add(state: TodoState[], todo: TodoState): TodoState[] {
        if (!isNumber(todo.user)) {
            todo.user = (todo.user as unknown as {id: number}).id;
        }
        return [todo, ...state];
    }

    remove(state: TodoState[], todo: TodoState): TodoState[] {
        return state.filter(current => todo.id !== current.id);
    }

    complete(state: TodoState[], todo: TodoState): TodoState[] {
        const index = state.findIndex(current => todo.id === current.id);
        return state.map((current, currentIndex) => {
            if (currentIndex !== index) {
                return current;
            }
            return {...current, complete: !todo.complete};
        });
    }

    getDefault(): TodoState {
        return {
          id: Math.random(),
          title: '',
          complete: false,
          user: 1
        };
    }
}
