export enum RoleType {
  SUPER_ADMIN,
  ADMIN,
  VENDOR,
  OPERATION
}

export interface Role {
  id: number;
  name: string;
  description: string;
  type: RoleType;
  isDefault: number;
}

export const SeedValues: Role[] = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'super admin can execute every operation.',
    isDefault: 1,
    type: RoleType.SUPER_ADMIN,
  },
  {
    id: 2,
    name: 'Admin',
    description: 'admin can execute operational task.',
    isDefault: 0,
    type: RoleType.ADMIN,
  },
  {
    id: 3,
    name: 'Vendor Admin',
    description: 'vendor admin can execute operational task',
    isDefault: 0,
    type: RoleType.VENDOR,
  },
  {
    id: 4,
    name: 'Operation',
    description: 'operation can execute operational task',
    isDefault: 0,
    type: RoleType.OPERATION,
  }
];
