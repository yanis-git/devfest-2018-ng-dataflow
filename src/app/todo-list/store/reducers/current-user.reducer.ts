import {CURRENT_USER_SWITCH, CurrentUserAction} from '../actions/current-user.action';


export function currentUserReducer(state: number = 1, action: CurrentUserAction): number {
  switch (action.type) {
    case CURRENT_USER_SWITCH:
      return action.payload as number;
  }
  return state;
}
