import { HeaderService } from './service/header.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavMenuService } from '@nav-menu/service/nav-menu.service';
import { ProfileService } from '@profile/service/profile.service';
import { AppConfigService } from '@config/app-config/app-config.service';

interface Header {
  logo: {
    imgUrl: string;
    routerLink: string;
    hoverName: string;
  };
  title: string;
}

@Component({
  selector: 'eye-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle = 'Page Title';
  @Input() userManual = {
    isEnable: true,
    command: (e: any) => {
      console.log(e);
    },
  };
  header: Header = {
    logo: {
      hoverName: '',
      imgUrl: '',
      routerLink: '',
    },
    title: '',
  };
  isHandset = false;
  constructor(
    public router: Router,
    private _header: HeaderService,
    private _nav: NavMenuService,
    private _profile: ProfileService,
    private appConfig: AppConfigService
  ) {}
  ngOnInit(): void {
    if (this._header.header.logo) {
      this.header.logo.imgUrl = this._header.header.logo.imgUrl;
      this.header.logo.hoverName = this._header.header.logo.hoverName;
      this.header.logo.routerLink = this._header.header.logo.routerLink;
      this.header.title = this._header.header.title;
    }
    this.header.title = this.pageTitle;
    this._nav.navMenu = this._header.header.navMenu;
    this._profile.profile = this._header.header.profile;
    this.isHandset = this.appConfig.isHandset;
  }
}
