import { Injectable } from '@angular/core';
import { TaskSchemaJson } from '@eye/core/api/common/common.model';
import { SchemaConfigModalComponent } from '@schema-config/schema-config-modal/schema-config-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class SchemaConfigService {
  constructor(private _dialogService: DialogService) {}
  open(item: {schema: TaskSchemaJson; isUpdate?: boolean}): DynamicDialogRef {
    const ref = this._dialogService.open(SchemaConfigModalComponent, {
      header: "Configuration",
      closeOnEscape: true,
      styleClass: '',
      contentStyle: {
        padding: 0,
        'border-bottom-left-radius': '0.375rem',
        'border-bottom-right-radius': '0.375rem',
      },
      data: {
        isUpdate: item.isUpdate ? item.isUpdate : false,
        schema: item.schema
      }
    });
    return ref;
  }
}
