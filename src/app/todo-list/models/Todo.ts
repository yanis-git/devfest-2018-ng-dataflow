import {User} from './User';

export interface TodoState {
    id: number;
    title: string;
    complete: boolean;
    user: number;
}

export interface Todo {
  id: number;
  title: string;
  complete: boolean;
  user: User;
}


export const todosState: TodoState[] = [
  {
      id: 1245,
      title: 'Build my Death Star',
      complete: false,
      user: 1
  },
  {
    id: 52508,
    title: 'Kill all Jedi',
    complete: false,
    user: 1

  },
  {
    id: 22013,
    title: 'Buy Ventolin',
    complete: false,
    user: 1
  },
  {
    id: 2043,
    title: 'Train new padawan',
    complete: false,
    user: 2
  }
];

const entities = {};
todosState.map(e => e.id).forEach((id, index) => entities[id] = todosState[index]);
export const todoEntities = {
  ids: todosState.map(e => e.id),
  entities,
};
