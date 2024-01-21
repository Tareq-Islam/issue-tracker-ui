import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AdminCustomerApiService } from '@eye/core/api/admin/admin-customer/admin-customer-api.service';
import { SearchCustomer } from '@eye/core/api/admin/admin-customer/admin-customer.model';
import { AdminIssueCategoryApiService } from '@eye/core/api/admin/issue-tracker/admin-issue-category/admin-issue-category-api.service';
import { IssueCategory } from '@eye/core/api/admin/issue-tracker/admin-issue-category/admin-issue-category.model';
import { AdminIssueInfoApiService } from '@eye/core/api/admin/issue-tracker/admin-issue-info/admin-issue-info-api.service';
import { AdminIssueApiService } from '@eye/core/api/admin/issue-tracker/admin-issue/admin-issue-api.service';
import { Base64Image } from '@eye/core/api/common/issue.model';
import { LoginUserClaimService } from '@eye/core/provider/login-user-claim/login-user-claim.service';
import { EyeFile } from '@eye/utilities/file/EyeFile';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';

@Component({
  selector: 'eye-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.scss'],
})
export class IssueCreateComponent implements OnInit {
  doorList: { label: string; value: string }[] = [];
  form = new UntypedFormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  customerId!: number;
  param = new HttpParams();
  constructor(
    private _customerApiService: AdminCustomerApiService,
    private _issueCategoryApiService: AdminIssueCategoryApiService,
    private _issuInfoApiService: AdminIssueInfoApiService,
    private _dialogService: DynamicDialogRef,
    private _issueApiService: AdminIssueApiService,
    private _dialogConfig: DynamicDialogConfig,
    private _claim: LoginUserClaimService
  ) {}

  ngOnInit(): void {
    const customer = this._claim.getGlobalStoreCustomer();
    if (customer) {
      this.customerId = customer.id;
    }
    this.onCreate();
  }

  async onCreate() {
    const params = new HttpParams();
    const customerList =
      (await this._customerApiService
        .searchCustomer(params)
        .pipe(map((x) => x?.data))
        .toPromise()) || [];
    const categoryList =
      (await this._issueCategoryApiService
        .getAllCategory(params)
        .pipe(map((x) => x.data))
        .toPromise()) || [];

    let subjectList: any;
    this.model = {
      issueCategoryId: null,
      doorId: this._dialogConfig.data
        ? {
            label: this._dialogConfig.data.door.doorName,
            value: this._dialogConfig.data.door.doorId,
          }
        : null,
      status: null,
      priority: null,
      remark: null,
      customerId: this.customerId ? this.customerId : null,
      isGlobalOnly: false,
      subject: null,
      comment: null,
      files: null,
    };

    this.fields = [
      {
        fieldGroupClassName: 'grid grid-cols-2 w-full items-start gap-5',
        fieldGroup: [
          {
            className: 'item-self-center',
            type: 'dropdown',
            key: 'customerId',
            templateOptions: {
              label: 'Customer',
              placeholder: 'Select a customer',
              appendTo: 'body',
              required: true,
              values: customerList.map((x: SearchCustomer) => {
                return {
                  label: x.customerName,
                  value: x.id,
                };
              }),
              change: (e: any) => {
                this.customerId = e.value;
                if (
                  this.fields[0].fieldGroup &&
                  this.fields[0].fieldGroup[1] &&
                  this.fields[0].fieldGroup[1].formControl
                )
                  this.fields[0].fieldGroup[1].formControl.reset();
              },
            },
            expressionProperties: {
              'templateOptions.disabled': () => {
                return this._dialogConfig.data ? true : false;
              },
            },
          },
          {
            className: 'item-self-center',
            type: 'autocomplete',
            key: 'doorId',
            templateOptions: {
              label: 'Door',
              placeholder: 'Enter door name',
              required: true,
              forceSelection: true,
              showEmptyMessage: true,
              results: [],
              searchObject: async (templateOptions: any, $event: any) => {
                this.param = this.param
                  .delete('keyword')
                  .append('keyword', $event.query.toLowerCase());
                const doors =
                  (await this.getDoor()
                    .pipe(map((x) => x.data))
                    .toPromise()) || [];
                templateOptions.results = doors.map((x) => {
                  return {
                    label: x.doorName,
                    value: x.doorId.toString(),
                  };
                });
              },
            },
            expressionProperties: {
              'templateOptions.disabled': () => {
                if (this._dialogConfig.data) {
                  return true;
                } else {
                  return !this.model.customerId ? true : false;
                }
              },
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'grid grid-cols-2 w-full items-start gap-5',
        fieldGroup: [
          {
            className: 'item-self-center',
            type: 'dropdown',
            key: 'issueCategoryId',
            templateOptions: {
              label: 'Issue Category',
              placeholder: 'Select a category',
              appendTo: 'body',
              required: true,
              values: categoryList.map((x: IssueCategory) => {
                return {
                  label: x.categoryName,
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
                  value: '1',
                },
                {
                  label: 'Medium',
                  value: '2',
                },
                {
                  label: 'High',
                  value: '3',
                },
              ],
            },
          },
        ],
      },
      {
        type: 'editor',
        key: 'remark',
        templateOptions: {
          label: 'Note',
          maxLength: 2000,
          headerTemplate: true,
        },
      },
      {
        type: 'checkbox',
        key: 'isGlobalOnly',
        templateOptions: {
          label: 'If checked, Is not available for the customer',
        },
      },
      {
        template:
          "<div class='w-full border-t mt-7 mb-7 border-gray-300 relative'><span class='absolute px-3 top-[-14px] left-[323px] bg-white text-base font-medium'>Comment</span> </div>",
      },
      {
        className: 'item-self-center',
        type: 'autocomplete',
        key: 'subject',
        templateOptions: {
          label: 'Subject',
          placeholder: 'Enter subject',
          required: true,
          forceSelection: false,
          results: [],
          maxLength: 200,
          searchObject: async (templateOptions: any, $event: any) => {
            subjectList = await this.getIssueCommentSubject($event.query);
            const result = subjectList.filter(
              (item: any) =>
                item.value.toLowerCase().indexOf($event.query.toLowerCase()) >
                -1
            );
            templateOptions.results = result;
          },
        },
        expressionProperties: {
          'templateOptions.options': 'this.subjectList',
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
      {
        type: 'multiFileUploader',
        key: 'files',
      },
    ];
  }

  getDoor() {
    return this._issuInfoApiService.searchIssueDoor(
      this.customerId,
      this.param
    );
  }

  async getIssueCommentSubject(keyword: any) {
    let param = new HttpParams();
    if (keyword) param = param.append('keyword', keyword);
    const responseData: any =
      (await this._issuInfoApiService
        .searchIssueCommentSubject(param)
        .toPromise()) || [];

    let result: any;
    if (responseData.data) {
      result = responseData.data.map((x: any) => {
        const subject = {
          label: x,
          value: x,
        };
        return subject;
      });
      return result;
    } else {
      return (result = []);
    }
  }

  async onSubmit(data: {
    issueCategoryId: number;
    doorId?: any;
    priority: number;
    remark: string;
    customerId?: number;
    isGlobalOnly: boolean;
    subject: any;
    comment: string;
    files: Base64Image[];
  }) {

    const Large_Media_Size = 1000;
    const Medium_Media_Size = 600;
    const Thum_Media_Size = 150;

    // Image Convert base64 string
    let objectNameChange: any;
    if (data.files) {
      const images = [];
      for (let index = 0; index < data.files.length; index++) {
        const element: any = data.files[index];
        const newImage = await this.convertToObject(element, {
          large: Large_Media_Size,
          thum: Thum_Media_Size,
        });
        images.push(newImage);
      }
      const file = await Promise.all(
        images.map((x) => {
          return this.convertBlobToBase64Object(x);
        })
      );
      objectNameChange = file.map((x) => {
        return {
          thumbnail: x.thum,
          large: x.large,
        };
      });
    }
    const submitData = {
      issueCategoryId: data.issueCategoryId,
      doorId: this.model.doorId.value,
      priority: data.priority,
      remark: data.remark,
      customerId: this.model.customerId,
      isGlobalOnly: data.isGlobalOnly,
      subject:
        typeof data.subject == 'string' ? data.subject : data.subject.value,
      comment: data.comment,
      files: objectNameChange,
    };

    this._issueApiService.createIssue(submitData).subscribe((res) => {
      this._dialogService.close();
    });
  }

  async convertToObject(
    file: File,
    size: { large: number; thum: number }
  ): Promise<{ large: Blob; thum: Blob }> {
    const eyeFile = new EyeFile();
    const File_SIZE_MIN = 200 * 1024;
    const l = await eyeFile.imageCompress({
      file,
      options: {
        width: size.large,
        minFileSizeForQuality: File_SIZE_MIN,
        quality: 0.8,
      },
    });
    const thum = await eyeFile.imageCompress({
      file,
      options: {
        width: size.thum,
        minFileSizeForQuality: File_SIZE_MIN,
        quality: 0.8,
      },
    });
    return { large: l, thum: thum };
  }

  async convertBlobToBase64Object(object: {
    large: Blob;
    thum: Blob;
  }): Promise<{ large: string; thum: string }> {
    const eyeFile = new EyeFile();
    const large = await eyeFile.convertBlobToBase64(object.large);
    const thum = await eyeFile.convertBlobToBase64(object.thum);
    return {
      large,
      thum,
    };
  }
}
