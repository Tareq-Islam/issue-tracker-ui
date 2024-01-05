import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { PrimeIcons } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EyeSidebarService } from '../service/sidebar.service';
import { Rights } from '@core/core/enum/rights/rights.enum';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { PanelType } from '@core/core/enum/common/common';

enum NavMenus {
  DASHBOARD = 1,
  ISSUE_MANAGEMENT,
  VENDOR,
  USER,
  SITE,
  ROLE
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[eye-menus]',
  templateUrl: './menus.component.html',
})
export class MenusComponent implements OnInit, OnDestroy {
  rights = Rights;
  isDropdownMenu = false;
  menus = [
    {
      id: NavMenus.DASHBOARD,
      label: 'dashboard',
      icon: PrimeIcons.HOME,
      routerLink: '/',
      isEnable: true,
      isDropdown: false,
      dropdownMenus: [],
    },
    {
      id: NavMenus.ISSUE_MANAGEMENT,
      label: 'issue management',
      icon: PrimeIcons.INBOX,
      routerLink: '/issue',
      isEnable: true,
      isDropdown: false,
      dropdownMenus: [],
    },
    {
      id: NavMenus.VENDOR,
      label: 'Vendor',
      icon: PrimeIcons.BRIEFCASE,
      routerLink: '/vendor',
      isEnable: true,
      isDropdown: false,
      dropdownMenus: [],
    },
    {
      id: NavMenus.USER,
      label: 'User',
      icon: PrimeIcons.USERS,
      routerLink: '/user',
      isEnable: true,
      isDropdown: false,
      dropdownMenus: [],
    },
    {
      id: NavMenus.ROLE,
      label: 'Role',
      icon: PrimeIcons.SHIELD,
      routerLink: '/role',
      isEnable: true,
      isDropdown: false,
      dropdownMenus: [],
    },
    {
      id: NavMenus.SITE,
      label: 'Site',
      icon: PrimeIcons.ARROWS_ALT,
      routerLink: '/site',
      isEnable: true,
      isDropdown: false,
      dropdownMenus: [],
    },
  ];
  _sidebarCloseEventSubscription = new Subscription();
  _sidebarHoverEventSubscription = new Subscription();
  uiMenus: any[] = [];
  sidebarClose = false;
  @Input() isHandset = false;
  constructor(
    private _sidebar: EyeSidebarService,
    private _router: Router,
    private _claim: LoginUserClaimService
  ) {}

  ngOnInit(): void {
    this.onNavMenusRights();
    this.uiMenus = _.cloneDeep(this.menus.filter((x) => x.isEnable));
    this._sidebarCloseEventSubscription =
      this._sidebar.sidebarCloseEvent.subscribe((res) => {
        this.sidebarClose = this.isHandset ? false : res;
      });
    this._sidebarHoverEventSubscription =
      this._sidebar.mouseHoverEvent.subscribe((res) => {
        this.sidebarClose = res;
      });

    this.uiMenus.forEach((x) => {
      if (x.isDropdown) {
        x.dropdownMenus.forEach((y: any) => {
          const isMatch = this._router.url.startsWith(y.routerLink);
          if (isMatch) {
            x.routerLink = 'active';
          }
        });
      }
    });
  }

  onNavMenusRights() {
    this.menus.forEach((x) => {
      // switch (x.id) {
      //   case NavMenus.TICKET: x.isEnable = Number(this._claim.payload.panelType) === PanelType.Vendor || Number(this._claim.payload.panelType) === PanelType.Customer;
      //   break;
      //   case NavMenus.TASK:
      //     x.isEnable = this._claim.rights.includes(this.rights.View_Task) && Number(this._claim.payload.panelType) === PanelType.Customer;
      //   break;
      //   case NavMenus.TASK_CATEGORY:
      //     x.isEnable = this._claim.rights.includes(this.rights.View_Ticket_Template) && Number(this._claim.payload.panelType) === PanelType.Customer;
      //   break;
      //   case NavMenus.CAUSE_FINDINGS:
      //     x.isEnable = this._claim.rights.includes(this.rights.View_Cause_Findings) && Number(this._claim.payload.panelType) === PanelType.Customer;
      //   break;
      //   case NavMenus.TASK_SOLUTION:
      //     x.isEnable = this._claim.rights.includes(this.rights.View_Task_Solution) && Number(this._claim.payload.panelType) === PanelType.Customer;
      //   break;
      //   case NavMenus.Vendor:
      //     x.isEnable = this._claim.rights.includes(this.rights.View_Vendor_Representatives) && Number(this._claim.payload.panelType) === PanelType.Customer;
      //   break;
      // }
    });
  }

  onMenuExpand(relativeId: string) {
    const relativeDiv = document.getElementById(relativeId);
    if (relativeDiv?.children[1].classList.contains('pi-angle-right')) {
      relativeDiv?.children[1].classList.remove('pi-angle-right');
      relativeDiv?.children[1].classList.add('pi-angle-down');
    } else {
      relativeDiv?.children[1].classList.remove('pi-angle-down');
      relativeDiv?.children[1].classList.add('pi-angle-right');
    }

    if (relativeDiv?.nextElementSibling?.classList.contains('hidden')) {
      relativeDiv?.nextElementSibling?.classList.remove('hidden');
      relativeDiv?.nextElementSibling?.classList.add('block');
    } else {
      relativeDiv?.nextElementSibling?.classList.add('hidden');
      relativeDiv?.nextElementSibling?.classList.remove('block');
    }
  }

  ngOnDestroy(): void {
    if (this._sidebarCloseEventSubscription) {
      this._sidebarCloseEventSubscription.unsubscribe();
    }
    if (this._sidebarHoverEventSubscription) {
      this._sidebarHoverEventSubscription.unsubscribe();
    }
  }
}
