import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api/primeicons';
import { Subscription } from 'rxjs';
import { SidebarService } from '../services/sidebar.service';
import { Router } from '@angular/router';
import { UserClaimService } from '@core/core/provider/user-claim/user-claim.service';
import * as _ from "lodash";

enum NavMenus {
  DASHBOARD = 1,
  TICKET,
  TASK,
  TASK_CATEGORY,
  CAUSE_FINDINGS,
  TASK_SOLUTION,
  Vendor,
}

@Component({
  selector: '[sidebar-menus]',
  templateUrl: './sidebar-menus.component.html',
})
export class SidebarMenusComponent  implements OnInit, OnDestroy {
  // rights = Rights;
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
      id: NavMenus.TICKET,
      label: 'ticket',
      icon: PrimeIcons.TICKET,
      routerLink: '/ticket',
      isEnable: false,
      isDropdown: false,
      dropdownMenus: [],
    },
    {
      id: NavMenus.TASK_CATEGORY,
      label: 'Ticket Template',
      icon: PrimeIcons.SHARE_ALT,
      routerLink: '/ticket/template',
      isEnable: true,
      isDropdown: false,
      dropdownMenus: [],
    },
    {
      id: NavMenus.TASK,
      label: 'task',
      icon: PrimeIcons.FILE,
      routerLink: '/task',
      isEnable: true,
      isDropdown: false,
      dropdownMenus: [],
    },
    {
      id: NavMenus.CAUSE_FINDINGS,
      label: 'Cause Findings',
      icon: PrimeIcons.FILE,
      routerLink: '/findings',
      isEnable: true,
      isDropdown: false,
      dropdownMenus: [],
    },
    {
      id: NavMenus.TASK_SOLUTION,
      label: 'Task Solution',
      icon: PrimeIcons.CLONE,
      routerLink: '/task/solution',
      isEnable: true,
      isDropdown: false,
      dropdownMenus: [],
    },
    {
      id: NavMenus.Vendor,
      label: 'Vendor Representative',
      icon: PrimeIcons.USER,
      routerLink: '/vendor',
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
    private _sidebar: SidebarService,
    private _router: Router,
    private _claim: UserClaimService
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
