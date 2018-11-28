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
      title: 'Build my Black Star',
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
