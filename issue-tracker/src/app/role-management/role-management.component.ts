import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { RoleType } from '@core/core/api/auth/login/auth.model';
import { RoleApiService } from '@core/core/api/role/role-api.service';
import { EyeSwalService } from '@core/core/provider/message/swal.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { EyeFormFieldsType } from '@forms/model/eye-forms.model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HeaderService } from '@page-layout/header/service/header.service';
import { MenuItem, PrimeIcons } from 'primeng/api';

interface Role {
  menus: MenuItem[];
  creationTime: string;
  description: string;
  id: number;
  roleName: string;
  roleType: RoleType;
}

enum ModalType {
  Create,
  Update,
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
  roleTypes = ['SUPER ADMIN', 'ADMIN', 'VENDOR ADMIN', 'OPERATION'];
  constructor(
    private _roleApi: RoleApiService,
    private _swal: EyeSwalService,
    private _header: HeaderService,
    public claim: LoginUserClaimService
  ) {}

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

  onUpdateItem(items: any[]): Role[] {
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

  onDelete(item: Role) {
    this._swal
      .confirm({
        message: `You want to delete the role ${item.roleName}`,
      })
      .then((cn: boolean) => {
        this._roleApi.delete(item.id).subscribe((res) => {
          this.items = this.items.filter((x) => x.id !== item.id);
        });
      });
  }

  onModalOpen(modalType: ModalType, item?: Role) {
    this.modalName = 'Default';
    this.form = new UntypedFormGroup({});
    this.fields = [];
    this.model = {};
    if (modalType === ModalType.Create) {
      this.model = {
        name: '',
        description: '',
        roleType: 2,
      };
      this.modalName = 'Create';
      this.fields = [
        {
          type: EyeFormFieldsType.INPUT,
          key: 'name',
          templateOptions: {
            label: 'Name',
            placeholder: 'Enter role name',
            required: true,
            maxLength: 100,
          },
        },
        {
          type: EyeFormFieldsType.DROPDOWN,
          key: 'roleType',
          templateOptions: {
            appendTo: 'body',
            label: 'Role Type',
            required: true,
            values: [
              {
                label: 'ADMIN',
                value: RoleType.ADMIN
              },
              {
                label: 'VENDOR ADMIN',
                value: RoleType.VENDOR_ADMIN
              },
              {
                label: 'OPERATION',
                value: RoleType.OPERATION
              }
            ] ,
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
        name: item?.roleName,
        description: item?.description,
      };
      this.fields = [
        {
          type: EyeFormFieldsType.INPUT,
          key: 'name',
          templateOptions: {
            label: 'Name',
            placeholder: 'Enter role name',
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
      this._roleApi
        .save({
          Name: this.model.name,
          Description: this.model.description,
          RoleType: this.model.roleType
        })
        .subscribe((res) => {
          if (res) {
            this.getItems();
          }
        });
      this.isModalOpen = false;
    }
    if (this.modalName == 'Update') {
      this._roleApi
        .update(this.model.id, {
          Name: this.model.name,
          Description: this.model.description,
        })
        .subscribe((res) => {
          if (res) {
            this.items.forEach((x) => {
              if (x.id === this.model.id) {
                x.roleName = this.model.name;
                x.description = this.model.description;
              }
            });
          }
        });
      this.isModalOpen = false;
    }
  }

}
