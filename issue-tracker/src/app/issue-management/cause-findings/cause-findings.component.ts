import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CauseFindingsApiService } from '@core/core/api/cause-findings/cause-finding-api.service';
import { EyeSwalService } from '@core/core/provider/message/swal.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { EyeFormFieldsType } from '@forms/model/eye-forms.model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
interface Findings {
  id: number;
  name: string;
  description: string | null;
  menus: MenuItem[];
}
enum ModalType {
  Create,
  Update,
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
    private _causeApi: CauseFindingsApiService,
    private _swal: EyeSwalService,
    public claim: LoginUserClaimService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  trackBy(index: number, item: Findings): number {
    return item.id;
  }

  getItems() {
    this.isApiCalling = true;
    this._causeApi.gets().subscribe({
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

  onUpdateItem(items: any[]): Findings[] {
    return items.map((x) => {
      const data: any = {
        ...x,
      };
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

  onDelete(item: Findings) {
    this._swal
      .confirm({
        message: `You want to delete the ${item.name}`,
      })
      .then((cn: boolean) => {
        this._causeApi.delete(item.id).subscribe((res) => {
          this.items = this.items.filter((x) => x.id !== item.id);
        });
      });
  }

  onModalOpen(modalType: ModalType, item?: Findings) {
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
            placeholder: 'Enter name',
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
        name: item?.name,
        description: item?.description
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
      this._causeApi
        .save({
          name: this.model.name,
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
        this._causeApi
          .update(this.model.id, {
            name: this.model.name,
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
