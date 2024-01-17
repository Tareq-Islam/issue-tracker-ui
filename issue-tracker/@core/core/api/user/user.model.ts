export interface User {
  id: number;
  name: string;
  roleId: number,
  userName: string;
  password: string;
}


export const SeedValues: User[] = [
  {
    id: 1,
    name: 'Administrative',
    roleId: 1,
    userName: 'admin',
    password: '1234'
  },
  {
    id: 2,
    name: 'Imam Uddin',
    roleId: 2,
    userName: 'imam',
    password: '1234'
  },

  {
    id: 3,
    name: 'Eye Electronics',
    roleId: 3,
    userName: 'eye',
    password: '1234'
  },

  {
    id: 4,
    name: 'S.M Shakib',
    roleId: 4,
    userName: 'shakib',
    password: '1234'
  }
];
