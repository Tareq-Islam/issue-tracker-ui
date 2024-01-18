import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HeaderService } from '@page-layout/header/service/header.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
interface Category {
  id: number;
  categoryName: string;
  description: string | null;
  menus: MenuItem[];
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  items: Category[] = [];
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
    public claim: LoginUserClaimService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  trackBy(index: number, item: Category): number {
    return item.id;
  }

  getItems() {
    this.items = [
      {
        id: 8,
        categoryName: 'Theft Incident',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 14,
        categoryName: 'Unauthorized Card Insert',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 11,
        categoryName: 'Unlock Issue',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 13,
        categoryName: 'Unlock Switch Fault',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 7,
        categoryName: 'Wrong Installation',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 17,
        categoryName: 'Cabinet Dismantle\t',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 2,
        categoryName: 'Device Offline',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 3,
        categoryName: 'Lock Close Failed',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 4,
        categoryName: 'Lock Fault',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 12,
        categoryName: 'Lock Malfunction',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 19,
        categoryName: 'Magnet Missing',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 9,
        categoryName: 'Memory Fault',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 16,
        categoryName: 'Network Issue',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 1,
        categoryName: 'Others',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 6,
        categoryName: 'RFID Reader Fault\t',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 10,
        categoryName: 'Security Breach',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 18,
        categoryName: 'SIM Device Issue',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 20,
        categoryName: 'SIM Fault Issue',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 15,
        categoryName: 'Site Dismantle',
        description: null,
        menus: this.itemMenus,
      },
      {
        id: 5,
        categoryName: 'Software Bug',
        description: null,
        menus: this.itemMenus,
      },
    ];
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

  onDelete(item: Category) {
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
