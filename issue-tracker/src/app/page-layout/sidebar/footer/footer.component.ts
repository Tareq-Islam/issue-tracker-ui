import { Component, OnInit } from '@angular/core';
import { EyeSidebarService } from '../service/sidebar.service';
import { AppConfigService } from '@config/app-config/app-config.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[eye-footer]',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  appCode = '1.0.0';
  isHandset = false;
  constructor(
    public sidebar: EyeSidebarService,
    private _appConfig: AppConfigService
  ) {}
  ngOnInit(): void {
    this.isHandset = this._appConfig.isHandset;
    this.appCode = this._appConfig.appCode;
  }
}
