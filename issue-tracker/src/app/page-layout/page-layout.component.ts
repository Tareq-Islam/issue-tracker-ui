import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html'
})
export class PageLayoutComponent implements OnInit, OnDestroy {
  _sidebarCloseEventSubscription = new Subscription();
  paddingLeft = 250;
  isHandset = false;
  constructor(
    // private _sidebar: EyeSidebarService,
    // private _appConfig: AppConfigService
  ) {}

  ngOnInit(): void {
    // this.isHandset = this._appConfig.isHandset;

    // this._sidebarCloseEventSubscription =
    //   this._sidebar.sidebarCloseEvent.subscribe((res) => {
    //     if (this.isHandset) {
    //       this.paddingLeft = 0;
    //     } else {
    //       this.paddingLeft = res ? 90 : 250;
    //     }
    //   });

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
