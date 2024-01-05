import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from '../model/header.model';
import { HeaderService } from '../service/header.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[eye-profile]',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user!: User;
  navigationMenu!: MenuItem[];
  constructor(private _headerService: HeaderService) {}
  ngOnInit() {
    if (this._headerService.profile) {
      this.user = this._headerService.profile.user;
      this.user.avatar = this.user.avatar ? this.user.avatar : 'E';
      this.navigationMenu = this._headerService.profile.menus;
    }
  }

}
