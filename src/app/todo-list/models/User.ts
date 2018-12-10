export interface User {
  id: number;
  name: string;
}


export const usersState: User[] = [
  {
    id: 1,
    name: 'Dark Vador'
  },
  {
    id: 2,
    name: 'Luke Skywalker'
  },
  {
    id: 3,
    name: 'Anakin'
  }
];


export const userEntities = {
  ids: [1, 2, 3],
  entities: {
    '1': usersState[0],
    '2': usersState[1],
    '3': usersState[2]
  }
};
