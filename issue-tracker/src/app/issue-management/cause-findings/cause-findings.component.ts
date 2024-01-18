import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HeaderService } from '@page-layout/header/service/header.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
interface Findings {
  id: number;
  cause: string;
  description: string | null;
  menus: MenuItem[];
}
@Component({
  selector: 'app-cause-findings',
  templateUrl: './cause-findings.component.html',
})
export class CauseFindingsComponent implements OnInit {
  items: Findings[] = [];
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

  trackBy(index: number, item: Findings): number {
    return item.id;
  }

  getItems() {
    this.items = [
      {
        id: 37,
        cause: 'BTS Unavailable',
        description: null,
       menus: this.itemMenus
      },
      {
        id: 34,
        cause: 'Controller Power Cable Fault',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 29,
        cause: 'Controller power disconnected',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 35,
        cause: 'Device burn due to thundering',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 1,
        cause: 'Device fault due to device internal issue',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 19,
        cause: 'Device fault due to the theft attempt',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 13,
        cause: 'Device internal fuse fault',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 4,
        cause: 'Device Memory Fault',
        description: '',
        menus: this.itemMenus
      },
      {
        id: 15,
        cause: 'Door alignment issue',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 27,
        cause: 'Door-Lock Sensor Cable Connection Issue',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 33,
        cause: 'External Fuse Fault',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 38,
        cause: 'GPRS Online Issue',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 32,
        cause: 'Key access issue',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 5,
        cause: 'Lock fault due to door angle issue',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 2,
        cause: 'Lock fault due to lock close failed',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 6,
        cause: 'Lock fault due to lock physically damage ',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 24,
        cause: 'Lock fault due to rainwater',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 14,
        cause: 'Lock fault due to the lock internal issue',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 3,
        cause: 'Lock fault due to the theft incident',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 11,
        cause: 'Lock Fault due to the wrong installation',
        description: null,
        menus: this.itemMenus
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

  onDelete(item: Findings) {
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
