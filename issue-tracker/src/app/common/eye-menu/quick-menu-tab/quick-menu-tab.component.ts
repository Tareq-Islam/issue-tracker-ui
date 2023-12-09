import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'eye-quick-menu-tab',
  templateUrl: './quick-menu-tab.component.html',
  styleUrls: ['./quick-menu-tab.component.scss']
})
export class QuickMenuTabComponent {
  _items!: MenuItem[];
  @Input() selectedTab!: MenuItem;
  @Input() public set menus(v : MenuItem[]) {
    this._items = v.filter((x) => x.visible);
    if (!this.selectedTab) {
      this.selectedTab = this._items[0];
    }
  }
  public get menus() : MenuItem[] {
    return this._items;
  }
  onSelectTab(item: MenuItem) {
    this.selectedTab = item;
    if (item.command) {
      item.command(item);
    }
  }

}
