import { Component, OnInit } from '@angular/core';
import { TaskSchemaJson } from '@eye/core/api/common/common.model';
import { SchemaConfigService } from '@schema-config/service/schema.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'eye-schema-config-modal',
  templateUrl: './schema-config-modal.component.html'
})
export class SchemaConfigModalComponent implements OnInit {
  isUpdateEnable = false;
  schemaConfigurationAttribute: TaskSchemaJson = {
    location: {
      enable: false,
    },
    image: {
      enable: false,
      insertOption: 2,
      imageOption: 1
    },
    causeFindings: {
      enable: false,
      insertOption: 2,
    },
    solution: {
      enable: false,
      insertOption: 2,
    }
  };
  constructor(
    private _config: DynamicDialogConfig,
    private _ref: DynamicDialogRef,
    public schemaConfig: SchemaConfigService
  ){}

  ngOnInit(): void {
    if (this._config.data && this._config.data.schema) {
      this.schemaConfigurationAttribute = this._config.data.schema;
      this.isUpdateEnable = this._config.data.isUpdate;
    };

  }

  close() {
    this._ref.close(this.schemaConfigurationAttribute);
  }
}
