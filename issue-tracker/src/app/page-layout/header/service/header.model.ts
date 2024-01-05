import { TemplateRef } from '@angular/core';
import { EyeMenus } from '@shared/components/search/search.component';
import { TypeheadMenus } from '@shared/components/typehead/typehead.component';
import { Observable } from 'rxjs';

export interface HeaderSearch {
  isSearchEnable: boolean;
  searchMenus: EyeMenus[];
  isLoading: boolean;
  isAutoComplete?: boolean;
  isCustomTemplate?: boolean;
  typeTemplate?: TemplateRef<any>;
  menuChange?: Observable<TypeheadMenus>;
  result?: { name: string; id: number }[];
  appendTo?: any | 'body';
  dropdownMenuAppendTo?: any | 'body';
}

export interface BranchDropdownMenuItem {
  branchId: string;
  branchName: string;
}

export interface HeaderBranch {
  isEnable: boolean;
  config?: {
    defaultSelectedMenuId?: string;
    isSelfStore?: boolean;
    invisibleMenuKeys?: string[];
  };
}
export interface SearchBranch {
  branchId: string;
  branchName: string;
}
