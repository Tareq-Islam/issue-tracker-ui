import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { RoleType } from '@core/core/api/auth/login/auth.model';
import { RoleApiService } from '@core/core/api/role/role-api.service';
import { EyeSwalService } from '@core/core/provider/message/swal.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HeaderService } from '@page-layout/header/service/header.service';
import { MenuItem, PrimeIcons } from 'primeng/api';

interface Role {
  id: number;
  name: string;
  description: string;
  roleType: number;
  isDefault: number;
  menus: MenuItem[];
}



@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
})
export class RoleManagementComponent implements OnInit {
  items: Role[] = [];
  isApiCalling = false;
  notFound = false;
  isModalOpen = false;
  roleType = RoleType;
  form!: UntypedFormGroup;
  model = {};
  fields: FormlyFieldConfig[] = [];
  itemMenus: MenuItem[] = [
    {
      label: 'Edit',
      icon: PrimeIcons.USER_EDIT,
      visible: true,
      command: ({ item }) => {
        // this.onModalOpen(
        //   this.modalType.Update,
        //   this.items.filter((x) => x.id === item.id)[0]
        // );
      },
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      visible: true,
      command: ({ item }) => {
        // this.onDelete(this.items.filter((x) => x.id === item.id)[0]);
      },
    },
  ];
  roleTypes = [
    'Super',
    'Admin',
    'Vendor',
    'Operation'
  ];
  constructor(
    private _roleApi: RoleApiService,
    private _swal: EyeSwalService,
    private _header: HeaderService,
    public claim: LoginUserClaimService,
  ) { }

  ngOnInit() {
    this._header.headerName = 'Role';
    this.getItems();
  }

  trackBy(index: number, item: Role): number {
    return item.id;
  }

  getItems() {
    this.isApiCalling = true;
    this._roleApi.gets().subscribe({
      next: (res) => {
        this.isApiCalling = false;
        this.notFound = false;
        if (res.data.length > 0) {
          this.items = res.data;
        } else {
          this.notFound = true;
          this.items = [];
        }
      },
      error: (err) => {
        this.isApiCalling = false;
      },
    });
  }

  onSubmit() {
    // this.isError = false;
    // if (this.selectedUsers.length === 0) {
    //   this.isError = true;
    //   this.errorMessage = 'Please select users.';
    //   return;
    // }
    // if (this.selectedUsers.length > 0) {
    //   this.isModalOpen = false;
    //   const userIds: number[] = [];
    //   this.selectedUsers.forEach((x) => {
    //     userIds.push(x.id);
    //   });
    //   this._vendorApi.save({userIds: userIds}).subscribe((res) => {this.getItems();});
    // }
  }

  onDelete(item: Role) {
    this._swal
      .confirm({
        message: `You want to delete the ${item.name}`,
      })
      .then((cn: boolean) => {
        this._roleApi.delete(item.id).subscribe((res) => {
          this.items = this.items.filter((x) => x.id !== item.id);
        });
      });
  }

}
