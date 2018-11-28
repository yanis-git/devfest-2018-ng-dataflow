import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Todo } from "../models/Todo";

@Injectable()
export class TodoListService {
    private _todos$: BehaviorSubject<Todo[]>;
    private _todos: Todo[];

    constructor() {
        this._todos$ = new BehaviorSubject<Todo[]>([]);
        this._todos = [];
    }

    add(todo: Todo) {
        this.notify(
            [todo, ...this._todos]
        );
    }

    remove(todo: Todo) {
        this.notify([
            ...this._todos.filter(current => todo !== current)
        ]);
    }

    getDefault(): Todo {
        return {
            title: '',
            complete: false
        };
    }

    complete(todo: Todo) {
        const index = this._todos.findIndex(current => todo === current);
        this.notify(
            this._todos.map((current, currentIndex) => {
                if (currentIndex !== index) {
                    return current;
                }
                  // {...current, complete: true};
                return Object.assign({}, current, {complete: true});
            })
        );
    }

    get todos$(): Observable<Todo[]> {
        return this._todos$.asObservable();
    }

    get todoCount$(): Observable<number> {
        return this.todos$.pipe(map(todos => todos.length));
    }

    get hasTodos$(): Observable<boolean> {
        return this.todoCount$.pipe(map(count => count > 0));
    }

    private notify(todos: Todo[]) {
        this._todos = todos;
        this._todos$.next(todos);
    }
}
