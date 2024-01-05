import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AppMessageService } from '@config/app-message/app-message.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EyeSidebarService } from '@page-layout/sidebar/service/sidebar.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { HeaderService } from './service/header.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';

@Component({
  selector: 'eye-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isToggleButton = true;
  toggleButtonIcon = 'pi pi-bars';
  profileMenus: MenuItem[] = [
    {
      label: 'Home',
      icon: PrimeIcons.HOME,
      visible: false,
      command: () => {
        // window.open(
        //   'https://smartlockdevweb.eyeelectronics.net/',
        //   'https://smartlockdevweb.eyeelectronics.net/'
        // );
      },
    },
    {
      label: 'Logout',
      icon: PrimeIcons.POWER_OFF,
      visible: true,
      command: () => {
        this._claim.onLogout();
      },
    },
  ];
  user = {
    avatar: 'A',
    name: 'Administrative',
    roleName: 'Super Admin',
  };
  isModalOpen = false;
  form = new UntypedFormGroup({});
  model!: any;
  fields: FormlyFieldConfig[] = [];
  @Input() isHandset = false;
  constructor(
    private _claim: LoginUserClaimService,
    private _sidebar: EyeSidebarService,
    public header: HeaderService,
    private _message: AppMessageService
  ) {}

  ngOnInit(): void {
    if (this._claim && this._claim.userName) {
      this.user.avatar = this._claim.userName[0].toUpperCase();
      this.user.name = this._claim.userName;
    }

    if (this._claim && this._claim.roleName)
      this.user.roleName = this._claim.roleName;

    this.header.profile = { menus: this.profileMenus, user: this.user };
  }

  toggleSidebar() {
    this._sidebar.onSidebarToggle(!this._sidebar.toggle);
    this._sidebar.onSidebarClose(!this._sidebar.isSidebarClose);
  }
}
