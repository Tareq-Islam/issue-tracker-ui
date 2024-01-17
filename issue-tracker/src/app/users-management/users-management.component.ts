import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HeaderService } from '@page-layout/header/service/header.service';
import { MenuItem, PrimeIcons } from 'primeng/api';

interface User {
  id: number;
  name: string;
  vendorName?: string;
  vendorId?: number;
  roleName: string;
  userName: string;
  menus: MenuItem[];
}

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
})
export class UsersManagementComponent implements OnInit {

  items: User[] = [];
  isApiCalling = false;
  notFound = false;
  isModalOpen = false;
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
      label: 'Change Password',
      icon: PrimeIcons.SHIELD,
      visible: true,
      command: ({ item }) => {
        // this.onDelete(this.items.filter((x) => x.id === item.id)[0]);
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
  constructor(
    // private _vendorApi: VendorApiService,
    // private _swal: EyeSwalService,
    private _header: HeaderService,
    public claim: LoginUserClaimService,
  ) { }

  ngOnInit() {
    this._header.headerName = 'User';
    this.getItems();
  }

  trackBy(index: number, item: User): number {
    return item.id;
  }

  getItems() {
    this.items = [
      {
        id: 1,
        name: 'Administrative',
        userName: 'admin',
        roleName: 'super admin',
        menus: this.itemMenus
      },
      {
        id: 2,
        name: 'Imam Uddin',
        userName: 'imam',
        roleName: 'admin',
        menus: this.itemMenus
      },
      {
        id: 3,
        name: 'Sultan',
        vendorName: 'Eye Electronics',
        vendorId: 1,
        roleName: 'vendor admin',
        userName: 'sultan',
        menus: this.itemMenus
      },

      {
        id: 4,
        name: 'Khairul Hasan',
        vendorName: 'Eye Electronics',
        vendorId: 1,
        roleName: 'operation',
        userName: 'khairul',
        menus: this.itemMenus
      },
      {
        id: 5,
        name: 'Akash',
        vendorName: 'HS Engineering And Technology Ltd',
        vendorId: 2,
        roleName: 'vendor admin',
        userName: 'akash',
        menus: this.itemMenus
      },

      {
        id: 6,
        name: 'Ahad',
        vendorName: 'HS Engineering And Technology Ltd',
        vendorId: 2,
        roleName: 'operation',
        userName: 'ahad',
        menus: this.itemMenus
      }
    ]
    // this.isApiCalling = true;
    // this._vendorApi.gets().subscribe({
    //   next: (res) => {
    //     this.isApiCalling = false;
    //     this.notFound = false;
    //     if (res.data.length > 0) {
    //       this.items = res.data;
    //     } else {
    //       this.notFound = true;
    //       this.items = [];
    //     }
    //   },
    //   error: (err) => {
    //     this.isApiCalling = false;
    //   },
    // });
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

  onDelete(item: User) {
    // this._swal
    //   .confirm({
    //     message: `You want to unassign the ${item.userName}`,
    //   })
    //   .then((cn: boolean) => {
    //     this._vendorApi.delete(item.id).subscribe((res) => {
    //       this.items = this.items.filter((x) => x.id !== item.id);
    //     });
    //   });
  }

}
