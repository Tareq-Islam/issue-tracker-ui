import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConfigService } from '@config/app-config/app-config.service';
import { Subscription } from 'rxjs';
import { EyeSidebarService } from './sidebar/service/sidebar.service';

@Component({
  selector: 'eye-page-layout',
  templateUrl: './page-layout.component.html',
})
export class PageLayoutComponent implements OnInit, OnDestroy {
  _sidebarCloseEventSubscription = new Subscription();
  paddingLeft = 250;
  isHandset = false;
  constructor(
    private _sidebar: EyeSidebarService,
    private _appConfig: AppConfigService
  ) {}

  ngOnInit(): void {
    this.isHandset = this._appConfig.isHandset;

    this._sidebarCloseEventSubscription =
      this._sidebar.sidebarCloseEvent.subscribe((res) => {
        if (this.isHandset) {
          this.paddingLeft = 0;
        } else {
          this.paddingLeft = res ? 90 : 250;
        }
      });

    if (this.isHandset) {
      this.paddingLeft = 0;
    } else {
      this.paddingLeft = 250;
    }
  }

  ngOnDestroy(): void {
    if (this._sidebarCloseEventSubscription) {
      this._sidebarCloseEventSubscription.unsubscribe();
    }
  }
}
