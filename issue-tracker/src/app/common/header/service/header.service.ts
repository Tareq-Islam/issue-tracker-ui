import { MenuItem } from 'primeng/api';
import { Injectable, EventEmitter } from '@angular/core';

export interface PageHeader {
  logo: {
    imgUrl: string;
    routerLink: string;
    hoverName: string;
  };
  title: string;
  navMenu: {
    btnIcon: string;
    btnIconProp: 'left' | 'right' | 'top' | 'bottom';
    btnLabel: string;
    menus: MenuItem[];
  };
  profile: {
    user: {
      avatar: string;
      name: string;
      permissionName: string;
      roleName: string;
    };
    menus: MenuItem[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  header!: PageHeader;
  constructor() {}
}
