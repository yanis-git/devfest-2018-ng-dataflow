import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import {todosState, TodoState} from '../models/Todo';

@Injectable()
export class TodoListService {
    private _todos$: BehaviorSubject<TodoState[]>;
    private _todos: TodoState[];

    constructor() {
        this._todos$ = new BehaviorSubject<TodoState[]>(todosState);
        this._todos = todosState;
    }

    add(todo: TodoState) {
        this.notify(
            [todo, ...this._todos]
        );
    }

    remove(todo: TodoState) {
        this.notify([
            ...this._todos.filter(current => todo.id !== current.id)
        ]);
    }

    getDefault(): TodoState {
        return {
            id: Math.random(),
            title: '',
            complete: false,
            user: 1
        };
    }

    complete(todo: TodoState) {
        const index = this._todos.findIndex(current => todo.id === current.id);
        this.notify(
            this._todos.map((current, currentIndex) => {
                if (currentIndex !== index) {
                    return current;
                }
                return {...current, complete: true};
            })
        );
    }

    get todos$(): Observable<TodoState[]> {
        return this._todos$.asObservable();
    }

    todosCount$(todos$: Observable<TodoState[]>): Observable<number> {
        return todos$.pipe(map(todos => todos.length));
    }

    hasTodos$(todos$: Observable<TodoState[]>): Observable<boolean> {
        return this.todosCount$(todos$).pipe(map(count => count > 0));
    }

    private notify(todos: TodoState[]) {
        this._todos = todos;
        this._todos$.next(todos);
    }
}
