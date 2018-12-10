import {User, userEntities} from '../../models/User';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';


export interface UserEntity extends EntityState<User> {}
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();
export const users: UserEntity = userAdapter.getInitialState(userEntities);

export function userReducer(state: UserEntity = users, action: {type: string, payload?: any}): UserEntity {

  return state;
}
