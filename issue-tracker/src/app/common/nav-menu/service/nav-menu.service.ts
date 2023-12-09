import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

export interface NavMenu {
  btnIcon: string;
  btnIconProp: 'left' | 'right' | 'top' | 'bottom';
  btnLabel: string;
  menus: MenuItem[];
}

@Injectable({
  providedIn: 'root',
})
export class NavMenuService {
  navMenu!: NavMenu;
  constructor() {}
}
