import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'eye-report-tab-bar',
  templateUrl: './report-tab-bar.component.html',
  styleUrls: ['./report-tab-bar.component.scss']
})
export class ReportTabBarComponent {
  @Input() tab!: MenuItem;
  _tabs!: MenuItem[];
  @Input() set tabs (v: MenuItem[]) {
    this._tabs = v.filter(x => {
      if (x.visible === undefined || x.visible) {
        return true;
      } else {
        return false;
      }
    });
    if(!this.tab) {
      this.tab = this._tabs[0];
    }
  };
  get tabs() : MenuItem[] {
    return this._tabs;
  }
  onChangeTab(tab: MenuItem) {
    this.tab = tab;
    if (tab.command)
    tab.command(tab);
  }

}
