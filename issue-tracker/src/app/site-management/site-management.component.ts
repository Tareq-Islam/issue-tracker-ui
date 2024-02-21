import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { RoleType } from '@core/core/api/auth/login/auth.model';
import { SiteApiService } from '@core/core/api/site/site-api.service';
import { EyeSwalService } from '@core/core/provider/message/swal.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { EyeFormFieldsType } from '@forms/model/eye-forms.model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HeaderService } from '@page-layout/header/service/header.service';
import { MenuItem, PrimeIcons } from 'primeng/api';

interface Site {
  id: number;
  siteName: string;
  description?: string;
  menus: MenuItem[];
}

enum ModalType {
  Create,
  Update,
}


@Component({
  selector: 'app-site-management',
  templateUrl: './site-management.component.html',
})
export class SiteManagementComponent implements OnInit {
  items: Site[] = [];
isApiCalling = false;
notFound = false;
isModalOpen = false;
form!: UntypedFormGroup;
model: any;
modalName = 'Default';
fields: FormlyFieldConfig[] = [];
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
  private _siteApi: SiteApiService,
  private _swal: EyeSwalService,
  private _header: HeaderService,
  public claim: LoginUserClaimService,
) { }

ngOnInit() {
  this._header.headerName = 'Site';
  this.getItems();
}

trackBy(index: number, item: Site): number {
  return item.id;
}

getItems() {
  this.isApiCalling = true;
  this._siteApi.gets().subscribe({
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

onUpdateItem(items: any[]): Site[] {
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

onDelete(item: Site) {
  this._swal
    .confirm({
      message: `You want to delete the site ${item.siteName}`,
    })
    .then((cn: boolean) => {
      this._siteApi.delete(item.id).subscribe((res) => {
        this.items = this.items.filter((x) => x.id !== item.id);
      });
    });
}

onModalOpen(modalType: ModalType, item?: Site) {
  this.modalName = 'Default';
  this.form = new UntypedFormGroup({});
  this.fields = [];
  this.model = {};
  if (modalType === ModalType.Create) {
    this.model = {
      name: '',
      description: '',
    };
    this.modalName = 'Create';
    this.fields = [
      {
        type: EyeFormFieldsType.INPUT,
        key: 'name',
        templateOptions: {
          label: 'Name',
          placeholder: 'Enter site name',
          required: true,
          maxLength: 100,
        },
      },
      {
        type: EyeFormFieldsType.TEXTAREA,
        key: 'description',
        templateOptions: {
          label: 'Description',
          placeholder: 'Enter description',
          maxLength: 300,
        },
      },
    ];
  }
  if (modalType === ModalType.Update) {
    this.modalName = 'Update';
    this.model = {
      id: item?.id,
      name: item?.siteName,
      description: item?.description
    };
    this.fields = [
      {
        type: EyeFormFieldsType.INPUT,
        key: 'name',
        templateOptions: {
          label: 'Name',
          placeholder: 'Enter site name',
          required: true,
          maxLength: 100,
        },
      },
      {
        type: EyeFormFieldsType.TEXTAREA,
        key: 'description',
        templateOptions: {
          label: 'Description',
          placeholder: 'Enter description',
          maxLength: 300,
        },
      },
    ];
  }
  this.isModalOpen = true;
}

onSubmit() {
  if (this.modalName == 'Create') {
    this._siteApi
      .save({
        siteName: this.model.name,
        Description: this.model.description,
      })
      .subscribe((res) => {
        if (res) {
          this.getItems();
        }
      });
    this.isModalOpen = false;
  }
  if (this.modalName == 'Update') {
      this._siteApi
        .update(this.model.id, {
          siteName: this.model.name,
          Description: this.model.description,
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
