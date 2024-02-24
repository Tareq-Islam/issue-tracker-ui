import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CategoryApiService } from '@core/core/api/category/category-api.service';
import { SiteApiService } from '@core/core/api/site/site-api.service';
import { VendorApiService } from '@core/core/api/vendor/vendor-api.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';

@Component({
  selector: 'eye-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.scss'],
})
export class IssueCreateComponent implements OnInit {
  form = new UntypedFormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private _dialogService: DynamicDialogRef,
    private _dialogConfig: DynamicDialogConfig,
    private _vendorApi: VendorApiService,
    private _siteApi: SiteApiService,
    private _categoryApi: CategoryApiService,
  ) {}

  ngOnInit(): void {
    this.onCreate();
  }

  async onCreate() {
    const vendor = await this._vendorApi.gets().pipe(map((x) => x?.data))
    .toPromise() || [];
    const site = await this._siteApi.gets().pipe(map((x) => x?.data))
    .toPromise() || [];
    const categoryList =
      (await this._categoryApi
        .gets()
        .pipe(map((x) => x.data))
        .toPromise()) || [];
    this.model = {
      categoryId: null,
      siteId: null,
      vendorId: null,
      priority: null,
      subject: null,
      comment: null,
    };

    this.fields = [
      {
        fieldGroupClassName: 'grid grid-cols-[50%,50%] gap-5',
        fieldGroup: [
          {
            className: 'item-self-center',
            type: 'dropdown',
            key: 'siteId',
            templateOptions: {
              label: 'Site',
              placeholder: 'Select a site',
              appendTo: 'body',
              required: true,
              values: site.map((x) => {
                return {
                  label: x.siteName,
                  value: x.id,
                };
              }),
            },
          },
          {
            className: 'item-self-center',
            type: 'dropdown',
            key: 'categoryId',
            templateOptions: {
              label: 'Category',
              placeholder: 'Select a category',
              appendTo: 'body',
              required: true,
              values: categoryList.map((x) => {
                return {
                  label: x.name,
                  value: x.id,
                };
              }),
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'grid grid-cols-[50%,50%] gap-5',
        fieldGroup: [
          {
            className: 'item-self-center',
            type: 'dropdown',
            key: 'vendorId',
            templateOptions: {
              label: 'Vendor',
              placeholder: 'Select a vendor',
              appendTo: 'body',
              required: true,
              values: vendor.map((x) => {
                return {
                  label: x.name,
                  value: x.id,
                };
              }),
            },
          },
          {
            className: 'item-self-center',
            type: 'dropdown',
            key: 'priority',
            templateOptions: {
              label: 'Priority',
              placeholder: 'Select a priority',
              values: [
                {
                  label: 'Low',
                  value: 0,
                },
                {
                  label: 'Medium',
                  value: 1,
                },
                {
                  label: 'High',
                  value: 2,
                },
                {
                  label: 'Critical',
                  value: 3,
                },
              ],
            },
          },
        ],
      },

      {
        className: 'item-self-center',
        type: 'input',
        key: 'subject',
        templateOptions: {
          label: 'Subject',
          placeholder: 'Enter subject',
          required: true,

          maxLength: 200,
        },
      },
      {
        type: 'editor',
        key: 'comment',
        templateOptions: {
          label: 'Comment',
          headerTemplate: true,
          required: true,
          maxLength: 2000,
          style: { height: '128px' },
        },
      },
    ];
  }
  onSubmit() {
    console.log( this.model);
    this._dialogService.close(this.model);
  }
}
