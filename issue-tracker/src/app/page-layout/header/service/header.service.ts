import { EventEmitter, Injectable } from '@angular/core';
import { Profile } from '../model/header.model';
import {
  BranchDropdownMenuItem,
  HeaderBranch,
  HeaderSearch,
  SearchBranch,
} from './header.model';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  branch: BranchDropdownMenuItem[] = [];
  originalBranch: SearchBranch[] = [];
  changeBranchEvent = new EventEmitter<{
    defaultSelectedMenuId?: number;
    isSelfStore?: boolean;
    invisibleMenuKeys?: number[];
  } | null>();
  selectedBranchEvent = new EventEmitter<{
    branchId: string;
    branchName: string;
    originalEvent?: any;
  }>();
  search: HeaderSearch = {
    isSearchEnable: false,
    searchMenus: [
      { label: 'Search', keyFilter: 'alphanum', placeholder: 'type here...' },
    ],
    isLoading: false,
  };
  branchDropdown: HeaderBranch = {
    isEnable: false,
    config: {},
  };
  headerName = 'Page Title';
  profile!: Profile;
  userManual = {
    isEnable: false,
    command: (e: any) => {
      console.log(e);
    },
  };
  constructor() {}
}
