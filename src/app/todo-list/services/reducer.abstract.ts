import {Action} from './store.service';


export abstract class ReducerAbstract {
  abstract reduce(state: any, action: Action): any;
}