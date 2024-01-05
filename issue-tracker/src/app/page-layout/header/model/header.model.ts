import { MenuItem } from "primeng/api";

export interface Profile {
  user: {
    avatar: string;
    name: string;
    permissionName: string;
    roleName: string;
  };
  menus: MenuItem[];
}

export interface User {
  avatar: string;
  name: string;
  permissionName: string;
  roleName: string;
}
