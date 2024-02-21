import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { RoleType } from '@core/core/api/auth/login/auth.model';
import { VendorApiService } from '@core/core/api/vendor/vendor-api.service';
import { EyeSwalService } from '@core/core/provider/message/swal.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { EyeFormFieldsType } from '@forms/model/eye-forms.model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HeaderService } from '@page-layout/header/service/header.service';
import { MenuItem, PrimeIcons } from 'primeng/api';

interface Vendor {
  id: number;
  name: string;
  contact: string;
  phone: string;
  address: string;
  menus: MenuItem[];
}

enum ModalType {
  Create,
  Update,
}


@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
})
export class VendorManagementComponent implements OnInit {
  items: Vendor[] = [];
  isApiCalling = false;
  notFound = false;
  isModalOpen = false;
  form!: UntypedFormGroup;
  fields: FormlyFieldConfig[] = [];
  model: any;
  modalName = 'Default';
  itemMenus: MenuItem[] = [
    {
      label: 'Edit',
      icon: PrimeIcons.USER_EDIT,
      visible: true,
      command: ({ item }) => {
        this.onModalOpen(
          ModalType.Update,
          item?.state?.item
        );

      },
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      visible: true,
      command: ({ item }) => {
        this.onDelete(item?.state?.item);
      },
    },
  ];
  constructor(
    private _vendorApi: VendorApiService,
    private _swal: EyeSwalService,
    private _header: HeaderService,
    public claim: LoginUserClaimService,
  ) { }

  ngOnInit() {
    this._header.headerName = 'Vendor';
    this.getItems();
  }

  trackBy(index: number, item: Vendor): number {
    return item.id;
  }

  getItems() {
    this.isApiCalling = true;
    this._vendorApi.gets().subscribe({
      next: (res) => {
        this.isApiCalling = false;
        this.notFound = false;
        if (res.data.length > 0) {
          this.items = this.onUpdateItem(res.data);
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

  onUpdateItem(items: any[]): Vendor[] {
    return items.map((x) => {
      const data: any = {
        ...x,
      };
      this.itemMenus.forEach((z) => {
        switch (z.label) {
          case 'Delete':
            z.visible = this.claim.payload.roleType === RoleType.SUPER_ADMIN;
            break;
        }
      });
      data.menus = this.itemMenus
        .filter((z) => z.visible)
        .map((y) => {
          return {
            ...y,
            state: {
              item: x
            }
          };
        });
      return data;
    });
  }

  onDelete(item: Vendor) {
    this._swal
      .confirm({
        message: `You want to delete the vendor ${item.name}`,
      })
      .then((cn: boolean) => {
        this._vendorApi.delete(item.id).subscribe((res) => {
          this.items = this.items.filter((x) => x.id !== item.id);
        });
      });
  }
  onModalOpen(modalType: ModalType, item?: Vendor) {
    this.modalName = 'Default';
    this.form = new UntypedFormGroup({});
    this.fields = [];
    this.model = {};

    if (modalType === ModalType.Create) {
      this.model = {
        name: '',
        address: '',
        contact: '',
        phone: '',
      };
      this.modalName = 'Create';
      this.fields = [
        {
          type: EyeFormFieldsType.INPUT,
          key: 'name',
          templateOptions: {
            label: 'Name',
            placeholder: 'Enter vendor name',
            required: true,
            maxLength: 100,
          },
        },
        {
          type: EyeFormFieldsType.INPUT,
          key: 'contact',
          templateOptions: {
            label: 'Contact Name',
            placeholder: 'Enter contact name',
            required: true,
            maxLength: 100,
          },
        },
        {
          type: EyeFormFieldsType.INPUT,
          key: 'phone',
          templateOptions: {
            label: 'Phone',
            placeholder: 'Enter Phone',
            required: true,
            maxLength: 100,
          },
        },
        {
          type: EyeFormFieldsType.TEXTAREA,
          key: 'address',
          templateOptions: {
            label: 'Address',
            placeholder: 'Enter address',
            maxLength: 300,
          },
        },
      ];
    }
    if (modalType === ModalType.Update) {
      this.modalName = 'Update';
      this.model = {
        id: item?.id,
        name: item?.name,
        address: item?.address,
        contact: item?.contact,
        phone: item?.phone,
      };
      this.fields = [
        {
          type: EyeFormFieldsType.INPUT,
          key: 'name',
          templateOptions: {
            label: 'Name',
            placeholder: 'Enter vendor name',
            required: true,
            maxLength: 100,
          },
        },
        {
          type: EyeFormFieldsType.INPUT,
          key: 'contact',
          templateOptions: {
            label: 'Contact Name',
            placeholder: 'Enter contact name',
            required: true,
            maxLength: 100,
          },
        },
        {
          type: EyeFormFieldsType.INPUT,
          key: 'phone',
          templateOptions: {
            label: 'Phone',
            placeholder: 'Enter Phone',
            required: true,
            maxLength: 100,
          },
        },
        {
          type: EyeFormFieldsType.TEXTAREA,
          key: 'address',
          templateOptions: {
            label: 'Address',
            placeholder: 'Enter address',
            maxLength: 300,
          },
        },
      ];
    }
    this.isModalOpen = true;
  }

  onSubmit() {
    if (this.modalName == 'Create') {
      this._vendorApi
        .save({
          Name: this.model.name,
          Contact: this.model.contact,
          Phone: this.model.phone,
          Address: this.model.address,
        })
        .subscribe((res) => {
          if (res) {
            this.getItems();
          }
        });
      this.isModalOpen = false;
    }
    if (this.modalName == 'Update') {
      this._vendorApi
        .update(this.model.id, {
          Name: this.model.name,
          Contact: this.model.contact,
          Phone: this.model.phone,
          Address: this.model.address,
        })
        .subscribe((res) => {
          if (res) {
            this.getItems();
          }
        });
      this.isModalOpen = false;
    }
  }
}
