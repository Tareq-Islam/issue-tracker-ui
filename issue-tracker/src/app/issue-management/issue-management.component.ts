import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@page-layout/header/service/header.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-issue-management',
  templateUrl: './issue-management.component.html',
})
export class IssueManagementComponent implements OnInit {
  quickMenus: MenuItem[] = [
    {
      label: 'Issues',
      visible: true,
      routerLink: '/issue-tracker/issue',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Category',
      visible: true,
      routerLink: '/issue-tracker/category',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Cause Findings',
      visible: true,
      routerLink: '/issue-tracker/cause/findings',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Solution Tag',
      visible: true,
      routerLink: '/issue-tracker/solution/tag',
      routerLinkActiveOptions: { exact: true },
    },
  ];
  constructor(private _header: HeaderService) {}
  ngOnInit(): void {
    this._header.headerName = 'issue tracker';
  }

}
