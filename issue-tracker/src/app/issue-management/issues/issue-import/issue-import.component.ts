import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AdminCustomerApiService } from '@eye/core/api/admin/admin-customer/admin-customer-api.service';
import { FormValidation } from '@eye/utilities/form/formValidation';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';

@Component({
  selector: 'eye-issue-import',
  templateUrl: './issue-import.component.html',
  styleUrls: ['./issue-import.component.scss'],
})
export class IssueImportComponent implements OnInit {
  form = new UntypedFormGroup({});
  model = {
    customerId: 0,
    file: null,
  };
  fields: FormlyFieldConfig[] = [];
  customers: any[] = [];
  constructor(
    private _customer: AdminCustomerApiService,
    private _ref: DynamicDialogRef,
    private _config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.onUpdateForm();
  }

  async onUpdateForm() {
    const customer =
      (await this._customer
        .searchCustomer()
        .pipe(map((x) => x?.data))
        .toPromise()) || [];
    this.form = new UntypedFormGroup({});
    this.fields = [
      {
        type: 'dropdown',
        key: 'customerId',
        templateOptions: {
          label: 'Customer',
          placeholder: 'Choose a customer',
          appendTo: 'body',
          required: true,
          values: customer.map((x) => {
            return {
              label: x.customerName,
              value: x.id,
            };
          }),
        },
        validation: {
          messages: {},
          show: true,
        },
      },
      {
        key: 'file',
        type: 'file',
        templateOptions: {
          label: 'Upload File',
          required: true,
          accept: '.xlsx, .xls',
        },
        validators: {
          file: {
            expression: (c: any) =>
              FormValidation.fileFormatValidation(c, 'xlsx'),
            message: (error: any, field: FormlyFieldConfig) =>
              `You should select an excel file with extention .xlsx`,
          },
        },
      },
      {
        template:
          "<div class='mb-7'><small class='text-red-600'>ex. File Format(.xlsx), <a class='underline text-blue-500 pl-2' href='assets/file/Issue.xlsx'>Download Sample Template</a></small></div>",
      },
    ];
  }

  onSubmit(model: any) {
    this._ref.close(model);
  }
}
