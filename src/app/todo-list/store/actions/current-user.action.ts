import {Action} from '@ngrx/store';


export const CURRENT_USER_SWITCH = '[CURRENT USER] switch current one';


export class CurrentUserSwitchAction implements Action {
  readonly type = CURRENT_USER_SWITCH;
  constructor(public payload: number) {}
}

export type CurrentUserAction = CurrentUserSwitchAction;