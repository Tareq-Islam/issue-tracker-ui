import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { RoleType } from '@core/core/api/auth/login/auth.model';
import { RoleApiService } from '@core/core/api/role/role-api.service';
import { UserApiService } from '@core/core/api/user/user-api.service';
import { VendorApiService } from '@core/core/api/vendor/vendor-api.service';
import { EyeSwalService } from '@core/core/provider/message/swal.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { EyeFormFieldsType } from '@forms/model/eye-forms.model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HeaderService } from '@page-layout/header/service/header.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { map } from 'rxjs';

interface User {
  id: number;
  loginName: string;
  vendorName?: string;
  vendorId?: number;
  roleName: string;
  roleId: number;
  userName: string;
  userEmail: string;
  userMobileNumber: string;
  creationTime: string;
  menus: MenuItem[];
}

enum ModalType {
  Create,
  Update,
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
  model: any;
  modalName = 'Default';
  fields: FormlyFieldConfig[] = [];
  itemMenus: MenuItem[] = [
    {
      label: 'Edit',
      icon: PrimeIcons.USER_EDIT,
      visible: true,
      command: ({ item }) => {
        this.onModalOpen(ModalType.Update, item?.state?.item);
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
    private _userApi: UserApiService,
    private _vendorApi: VendorApiService,
    private _roleApi: RoleApiService,
    private _swal: EyeSwalService,
    private _header: HeaderService,
    public claim: LoginUserClaimService
  ) {}

  ngOnInit() {
    this._header.headerName = 'User';
    this.getItems();
  }

  trackBy(index: number, item: User): number {
    return item.id;
  }

  getItems() {
    this.isApiCalling = true;
    this._userApi.gets().subscribe({
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

  onUpdateItem(items: any[]): User[] {
    return items.map((x) => {
      const data: any = {
        ...x,
      };
      this.itemMenus.forEach((z) => {
        switch (z.label) {
          case 'Delete':
            z.visible = x.roleType !== RoleType.SUPER_ADMIN;
            break;
            case 'Edit':
              z.visible = x.roleType !== RoleType.SUPER_ADMIN;
              break;
        }
      });
      data.menus = this.itemMenus
        .filter((z) => z.visible)
        .map((y) => {
          return {
            ...y,
            state: {
              item: x,
            },
          };
        });
      return data;
    });
  }

  onDelete(item: User) {
    this._swal
      .confirm({
        message: `You want to delete the ${item.userName}`,
      })
      .then((cn: boolean) => {
        this._userApi.delete(item.id).subscribe((res) => {
          this.items = this.items.filter((x) => x.id !== item.id);
        });
      });
  }

  async onModalOpen(modalType: ModalType, item?: User) {
    const vendors = await this._vendorApi.gets().pipe(map(x => x.data)).toPromise() || [];
    const roles = await this._roleApi.gets().pipe(map(x => x.data.filter(x => x.roleType !== RoleType.SUPER_ADMIN))).toPromise() || [];
    this.modalName = 'Default';
    this.form = new UntypedFormGroup({});
    this.fields = [];
    this.model = {};
    if (modalType === ModalType.Create) {
      this.model = {
        name: '',
        email: '',
        phone: '',
        loginName: '',
        vendor: '',
        role: '',
        password: '',
        passwordConfirm: ''
      };
      this.modalName = 'Create';
      this.fields = [
        {
          type: EyeFormFieldsType.INPUT,
          key: 'name',
          templateOptions: {
            label: 'Name',
            placeholder: 'Enter name',
            required: true,
            maxLength: 100,
          },
        },
        {
          type: EyeFormFieldsType.INPUT,
          key: 'email',
          templateOptions: {
            label: 'Email',
            placeholder: 'Enter Email',
            maxLength: 100,
          },
        },
        {
          type: EyeFormFieldsType.INPUT,
          key: 'phone',
          templateOptions: {
            label: 'Phone',
            placeholder: 'Enter phone number',
          },
        },
        {
          type: EyeFormFieldsType.INPUT,
          key: 'loginName',
          templateOptions: {
            label: 'Login Name',
            placeholder: 'Enter login name',
            required: true,
          },
        },
        {
          type: EyeFormFieldsType.DROPDOWN,
          key: 'vendor',
          templateOptions: {
            appendTo: 'body',
            label: 'Vendor',
            placeholder: 'Choose a vendor',
            values: [{
              label: 'Choose a vendor',
              value: 0
            },...vendors.map(x => {
              return {
                label: x.name,
                value: x.id
              }
            })],
          },
        },
        {
          type: EyeFormFieldsType.DROPDOWN,
          key: 'role',
          templateOptions: {
            appendTo: 'body',
            label: 'Role',
            required: true,
            placeholder: 'Choose a role',
            values: roles.map(x => {
              return {
                label: x.roleName,
                value: x.id
              }
            }),
          },
        },
        {
          type: 'inputPassword',
          key: 'password',
          templateOptions: {
            type: 'password',
            label: 'Password',
            placeholder: 'Enter password',
            toggleMask: true,
            required: true,
            minLength: 6,
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) =>
                `Wrong format. Please enter at lease 6 characters.`,
            },
          },
        },
        {
          type: 'inputPassword',
          key: 'passwordConfirm',
          templateOptions: {
            type: 'password',
            label: 'Confirm Password',
            placeholder: 'Enter confirm password',
            toggleMask: true,
            required: true,
            minLength: 6,
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) =>
                `Wrong format. Please enter at lease 6 characters`,
            },
          },
          validators: {
            passwordConfirm: {
              expression: (control: UntypedFormControl) =>
                control.value === this.model.password,
              message: 'Password Not Matching',
            },
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.password',
          },
        }
      ];
    }
    if (modalType === ModalType.Update) {
      this.modalName = 'Update';
      this.model = {
        id: item?.id,
        name: item?.userName,
        email: item?.userEmail,
        phone: item?.userMobileNumber,
        vendor: item?.vendorId,
      };
      this.fields = [
        {
          type: EyeFormFieldsType.INPUT,
          key: 'name',
          templateOptions: {
            label: 'Name',
            placeholder: 'Enter name',
            required: true,
            maxLength: 100,
          },
        },
        {
          type: EyeFormFieldsType.INPUT,
          key: 'email',
          templateOptions: {
            label: 'Email',
            placeholder: 'Enter Email',
            maxLength: 100,
          },
        },
        {
          type: EyeFormFieldsType.INPUT,
          key: 'phone',
          templateOptions: {
            label: 'Phone',
            placeholder: 'Enter phone number',
          },
        },
        {
          type: EyeFormFieldsType.DROPDOWN,
          key: 'vendor',
          templateOptions: {
            appendTo: 'body',
            label: 'Vendor',
            placeholder: 'Choose a vendor',
            values: [{
              label: 'Choose a vendor',
              value: 0
            },...vendors.map(x => {
              return {
                label: x.name,
                value: x.id
              }
            })],
          },
        },
      ];
    }
    this.isModalOpen = true;
  }

  onSubmit() {
    if (this.modalName == 'Create') {
      this._userApi
        .save({
          UserName: this.model.name,
          UserEmail: this.model.email,
          MobileNumber: this.model.phone,
          LoginName: this.model.loginName,
          VendorId: this.model.vendor === 0 ? undefined : this.model.vendor,
          RoleId: this.model.role,
          Password: this.model.password,
        })
        .subscribe((res) => {
          if (res) {
            this.getItems();
          }
        });
      this.isModalOpen = false;
    }
    if (this.modalName == 'Update') {
      this._userApi
        .update(this.model.id, {
          UserName: this.model.name,
          UserEmail: this.model.email,
          MobileNumber: this.model.phone,
          VendorId: this.model.vendor === 0 ? undefined : this.model.vendor,
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
