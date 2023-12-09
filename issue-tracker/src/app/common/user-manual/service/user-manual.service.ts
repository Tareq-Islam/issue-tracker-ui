import { Injectable } from '@angular/core';
import Dashboard from '@assets/file/documentation/dashboard/dashboard.json';
import Branch from '@assets/file/documentation/branch/branch.json';
import Key_Request_Permission from '@assets/file/documentation/key-request-permission/key-request-permission.json'
import Site from '@assets/file/documentation/site/site.json';
import Brand from '@assets/file/documentation/brand/brand.json';
import Key_Profile from '@assets/file/documentation/key-profile/key-profile.json';
import Key_Case from '@assets/file/documentation/key-case/key-case.json';
import My_Keys from '@assets/file/documentation/my-keys/my-keys.json';
import Key_Request_Purpose from '@assets/file/documentation/key-request-purpose/key-request-purpose.json';
import Key_Transfer from '@assets/file/documentation/key-transfer/key-transfer.json';
import Key_Transfer_Approval from '@assets/file/documentation/key-transfer-approval/key-transfer-approval.json';
import Key_Request from '@assets/file/documentation/key-request/key-request.json';
import Key_Request_Approval from '@assets/file/documentation/key-request-approval/key-request-approval.json';
import Key_Extend from '@assets/file/documentation/key-extend/key-extend.json';
import Key_Extend_Approval from '@assets/file/documentation/key-extend-approval/key-extend-approval.json';
import Key_Handover from '@assets/file/documentation/key-handover/key-handover.json';
import Key_Return from '@assets/file/documentation/key-return/key-return.json';
import Key_Return_Approval from '@assets/file/documentation/key-return-approval/key-return-approval.json';

import { LoginUserClaimService } from '@eye/core/provider/login-user-claim/login-user-claim.service';
import { UserManualComponent } from '@user-manual/user-manual.component';
import * as _ from 'lodash';
import { DialogService } from 'primeng/dynamicdialog';

import {
  CustomerUserManual,
  UserManual,
} from '@user-manual/model/user-manual.model';

@Injectable({ providedIn: 'root' })
export class UserManualService {
  constructor(
    private _dialogService: DialogService,
    private _claim: LoginUserClaimService
  ) {}

  onUserManual(manual: CustomerUserManual) {
    const finalManual: UserManual[] = this.onPermittedManual(manual) || [];
    this._dialogService.open(UserManualComponent, {
      header: `User Manual`,
      closeOnEscape: false,
      styleClass: '2xl:w-[75vw] md:w-[70vw] w-[95vw]',
      data: { userManual: finalManual },
      contentStyle: {
        padding: 0,
        'border-top': '1px solid #ddd',
        'border-bottom-right-radius': '0.375rem',
        'border-bottom-left-radius': '0.375rem',
      },
    });
  }

  private onPermittedManual(name: CustomerUserManual): UserManual[] | null {
    switch (name) {

      case CustomerUserManual.Dashboard:
        const dashboard: UserManual[] = _.cloneDeep(Dashboard);
        dashboard.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return dashboard.filter((x) => x.isVisible);

      case CustomerUserManual.Branch_Permission:
        const branch: UserManual[] = _.cloneDeep(Branch);
        branch.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return branch.filter((x) => x.isVisible);

      case CustomerUserManual.Key_Request_Permission:
        const request_user_permission: UserManual[] = _.cloneDeep(Key_Request_Permission);
        request_user_permission.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return request_user_permission.filter((x) => x.isVisible);

      case CustomerUserManual.Site:
        const site: UserManual[] = _.cloneDeep(Site);
        site.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return site.filter((x) => x.isVisible);

      case CustomerUserManual.Brand:
        const brand: UserManual[] = _.cloneDeep(Brand);
        brand.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return brand.filter((x) => x.isVisible);

      case CustomerUserManual.Key_Profile:
        const key_profile: UserManual[] = _.cloneDeep(Key_Profile);
        key_profile.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return key_profile.filter((x) => x.isVisible);

      case CustomerUserManual.Key_Case:
        const key_case: UserManual[] = _.cloneDeep(Key_Case);
        key_case.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return key_case.filter((x) => x.isVisible);

      case CustomerUserManual.My_Keys:
        const my_keys: UserManual[] = _.cloneDeep(My_Keys);
        my_keys.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return my_keys.filter((x) => x.isVisible);

      case CustomerUserManual.Key_Request_Purpose:
        const key_request_purpose: UserManual[] = _.cloneDeep(Key_Request_Purpose);
        key_request_purpose.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return key_request_purpose.filter((x) => x.isVisible);

      case CustomerUserManual.Key_Transfer:
        const key_transfer: UserManual[] = _.cloneDeep(Key_Transfer);
        key_transfer.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return key_transfer.filter((x) => x.isVisible);

      case CustomerUserManual.Key_Transfer_Approval:
        const key_transfer_approval: UserManual[] = _.cloneDeep(Key_Transfer_Approval);
        key_transfer_approval.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return key_transfer_approval.filter((x) => x.isVisible);        

      case CustomerUserManual.Key_Request:
        const user: UserManual[] = _.cloneDeep(Key_Request);
        user.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return user.filter((x) => x.isVisible);

      case CustomerUserManual.Key_Request_Approval:
        const key_request_approval: UserManual[] = _.cloneDeep(Key_Request_Approval);
        key_request_approval.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return key_request_approval.filter((x) => x.isVisible);

      case CustomerUserManual.Key_Extend:
        const key_extend: UserManual[] = _.cloneDeep(Key_Extend);
        key_extend.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return key_extend.filter((x) => x.isVisible);

      case CustomerUserManual.Key_Extend_Approval:
        const key_extend_approval: UserManual[] = _.cloneDeep(Key_Extend_Approval);
        key_extend_approval.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return key_extend_approval.filter((x) => x.isVisible);

      case CustomerUserManual.Key_Handover:
        const key_handover: UserManual[] = _.cloneDeep(Key_Handover);
        key_handover.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return key_handover.filter((x) => x.isVisible);

      case CustomerUserManual.Key_Return:
        const key_return: UserManual[] = _.cloneDeep(Key_Return);
        key_return.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return key_return.filter((x) => x.isVisible);

      case CustomerUserManual.Key_Return_Approval:
        const key_return_approval: UserManual[] = _.cloneDeep(Key_Return_Approval);
        key_return_approval.forEach((x) => x.isVisible = this.visibilityCheck(x.rights, x.isAllRightsMatched));
        return key_return_approval.filter((x) => x.isVisible);

      default:
        return null;
    }
  }


  private visibilityCheck(rights: number[], isAllRightsMatched: boolean): boolean {
    if (isAllRightsMatched) {
      return rights.every(r => this._claim.rights.includes(r));
    } else {
      return rights.some(r => this._claim.rights.includes(r));
    }
  }
}
