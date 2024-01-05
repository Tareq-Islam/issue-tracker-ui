import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { BranchDropdownMenuItem } from '../service/header.model';
import { HeaderService } from '../service/header.service';
import { STORAGE_KEY, STORAGE_TYPE, StorageService } from '@core/storage/storage.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';

@Component({
  selector: 'eye-header-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class HeaderDropdownComponent implements OnInit, OnDestroy {
  _changesBranchEvent!: Subscription;
  isSelfStore = true;
  branchDropdownMenus: any[] = [];
  selectedBranch: null | Object = null;
  constructor(
    public header: HeaderService,
    private _storage: StorageService,
    private _claim: LoginUserClaimService
  ) {}

  ngOnDestroy(): void {
    if (this._changesBranchEvent) {
      this._changesBranchEvent.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.branchDropdownMenus = new Array();
    // if (
    //   this._claim.isCustodian &&
    //   Number(this._claim.payload.panelType) === PanelType.Customer
    // )
    //   this.onBranchDropdown({ ...this.header.branchDropdown.config });
    // this._changesBranchEvent = this.header.changeBranchEvent.subscribe(
    //   (res: {
    //     isSelfStore?: boolean;
    //     invisibleMenuKeys?: string[];
    //     defaultSelectedMenuId?: string;
    //   }) => {
    //     this.onBranchDropdown(res);
    //   }
    // );
  }

  onSelected(event: any) {
    const { originalEvent, value } = event;
    if (this.isSelfStore) {
      this.onStoreBranch(value);
      this.header.selectedBranchEvent.emit({ ...value, originalEvent });
    } else {
      this.header.selectedBranchEvent.emit({ ...value, originalEvent });
    }
  }
  onStoreBranch(branch: BranchDropdownMenuItem) {
    this._storage.save({
      type: STORAGE_TYPE.Cookie,
      key: STORAGE_KEY.Login_token,
      value: JSON.stringify(branch),
      path: '/',
      expires: new Date(new Date().setFullYear(2040)),
    });
  }

  async onBranchDropdown(options: {
    isSelfStore?: boolean;
    invisibleMenuKeys?: string[];
    defaultSelectedMenuId?: string;
  }) {
    let branch: BranchDropdownMenuItem[] = [];
    this.selectedBranch = null;
    this.isSelfStore = true;
    const store_data = this.onGetPersistBranch();
    try {
      const branchs = await this.onGetBranch();
      branch = _.cloneDeep(branchs);
    } catch (error) {
      branch = [];
      console.error(error);
    }

    if (
      options &&
      options.invisibleMenuKeys &&
      options.invisibleMenuKeys.length > 0
    ) {
      options.invisibleMenuKeys.forEach((z) => {
        const exists = branch.findIndex((y) => y.branchId === z);
        if (exists !== -1) {
          branch.splice(exists, 1);
        }
      });
    }

    this.branchDropdownMenus = branch;
    this.selectedBranch = branch[0];
    if (options && options.defaultSelectedMenuId !== undefined) {
      const item: BranchDropdownMenuItem[] = branch.filter(
        (x) => x.branchId === options.defaultSelectedMenuId
      );
      this.selectedBranch = item ? item[0] : null;
      // if (item.length === 0 && options.defaultSelectedMenuId === 0) {
      //   this.branchDropdownMenus.unshift({ id: 0, name: 'All Customer' });
      //   this.selectedBranch = this.branchDropdownMenus[0];
      // } else {
      //   this.selectedBranch = item ? item[0] : null;
      // }
    } else {
      if (store_data) {
        const item = branch.filter((x) => x.branchId === store_data.branchId);
        this.selectedBranch = item ? item[0] : null;
      } else {
        if (branch.length > 0) {
          this.onStoreBranch({
            branchId: branch[0].branchId,
            branchName: branch[0].branchName,
          });
          this.header.selectedBranchEvent.emit(branch[0]);
        }
      }
    }

    if (options && options.isSelfStore) {
      this.isSelfStore = options.isSelfStore ? false : true;
    }
  }

  onGetBranch(): Promise<BranchDropdownMenuItem[]> {
    return new Promise((resolve, reject) => {
      if (this.header.branch.length > 0) {
        resolve(this.header.branch);
      } else {
        // this._branchApi.get().subscribe((res) => {
        //   // this.header.branch = [{ id: 0, name: 'All Customer' }];
        //   if (res) {
        //     this.header.originalBranch = res.data;
        //     res.data.forEach((x) => {
        //       this.header.branch.push({
        //         branchId: x.branchId,
        //         branchName: x.branchName,
        //       });
        //     });
        //   }
        //   resolve(this.header.branch);
        // });
      }
    });
  }

  onGetPersistBranch(): BranchDropdownMenuItem | null {
    const Branch_Persist_Data = this._storage.get({
      type: STORAGE_TYPE.Cookie,
      key: STORAGE_KEY.Login_token,
    });
    if (Branch_Persist_Data) {
      const store_data: BranchDropdownMenuItem =
        JSON.parse(Branch_Persist_Data);
      return store_data;
    }
    return null;
  }
}
