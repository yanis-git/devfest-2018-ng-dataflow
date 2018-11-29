import {ReducerAbstract} from './reducer.abstract';
import {Action} from './store.service';


export class CurrentUserService extends ReducerAbstract {

  reduce(state: number, action: Action): number {
    switch (action.type) {
      case 'set_current_user':
        return action.payload as number;
    }
    return state;
  }
}