import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavMenuService } from './service/nav-menu.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[eye-nav-menu]',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  navigationMenu: MenuItem[] = [];
  icon: string = 'pi pi-bars';
  iconProps: 'left' | 'right' | 'top' | 'bottom' = 'left';
  label = 'Button';
  @Input() isHandset = false;
  constructor(private _nav: NavMenuService) {}
  ngOnInit() {
    this.navigationMenu = this._nav.navMenu.menus;
    this.label = this._nav.navMenu.btnLabel;
    this.icon = this._nav.navMenu.btnIcon;
    this.iconProps = this._nav.navMenu.btnIconProp;
  }
}
