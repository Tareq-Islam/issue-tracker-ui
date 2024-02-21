import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { SolutionTagApiService } from '@core/core/api/solution-tag/solution-tag-api.service';
import { EyeSwalService } from '@core/core/provider/message/swal.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { EyeFormFieldsType } from '@forms/model/eye-forms.model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

interface Tag {
  id: number;
  name: string;
  description: string;
  menus: MenuItem[];
}

enum ModalType {
  Create,
  Update,
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
    private _tagApi: SolutionTagApiService,
    private _swal: EyeSwalService,
    public claim: LoginUserClaimService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  trackBy(index: number, item: Tag): number {
    return item.id;
  }

  getItems() {
    this.isApiCalling = true;
    this._tagApi.gets().subscribe({
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

  onUpdateItem(items: any[]): Tag[] {
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

  onDelete(item: Tag) {
    this._swal
      .confirm({
        message: `You want to delete the ${item.name}`,
      })
      .then((cn: boolean) => {
        this._tagApi.delete(item.id).subscribe((res) => {
          this.items = this.items.filter((x) => x.id !== item.id);
        });
      });
  }

  onModalOpen(modalType: ModalType, item?: Tag) {
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
      this._tagApi
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
        this._tagApi
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
