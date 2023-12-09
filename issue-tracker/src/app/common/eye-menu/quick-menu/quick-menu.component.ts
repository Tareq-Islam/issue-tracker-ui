import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'eye-quick-menu',
  templateUrl: './quick-menu.component.html',
  styleUrls: ['./quick-menu.component.scss'],
})
export class QuickMenuComponent implements OnInit {
  @Input() menus!: MenuItem[];
  constructor() {}
  ngOnInit() {
    if (this.menus) {
      this.menus = this.menus.filter((x) => x.visible);
    }
  }
}
