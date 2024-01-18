import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HeaderService } from '@page-layout/header/service/header.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
interface Tag {
  id: number;
  tagName: string;
  description: string | null;
  menus: MenuItem[];
}
@Component({
  selector: 'app-solution-tag',
  templateUrl: './solution-tag.component.html',
})
export class SolutionTagComponent implements OnInit {
  items: Tag[] = [];
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
    public claim: LoginUserClaimService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  trackBy(index: number, item: Tag): number {
    return item.id;
  }

  getItems() {
    this.items = [
      {
        id:1,
        tagName: 'Antenna Replace',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 2,
        tagName: 'Cable Reconnected',
        description: null,
        menus: this.itemMenus

      },
      {
        id: 3,
        tagName: 'Controler Internal Fuse Replace',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 4,
        tagName: 'Controler Replace',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 5,
        tagName: 'Controller Power Cable Replace',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 6,
        tagName: 'Controller power connected',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 7,
        tagName: 'Door Rectification Pending',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 8,
        tagName: 'Door-Lock Sensor Cable Connect',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 9,
        tagName: 'Drop Bolt Lock Replace',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 10,
        tagName: 'External Fuse Replace',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 11,
        tagName: 'Firmware update',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 12,
        tagName: 'GPRS Issue Resolved & Online Available',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 13,
        tagName: 'Lock Box Replace',
        description: null,
        menus: this.itemMenus
      },
      {
        id: 14,
        tagName: 'Lock Magnet Plate Position Change',
        description: null,
        menus: this.itemMenus
      },
      {
        id:15,
        tagName: 'Lock Magnet Plate Replace',
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

  onDelete(item: Tag) {
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
