import { Component, Input } from '@angular/core';
import { TaskSchemaJson } from '@eye/core/api/common/common.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[eye-schema-config]',
  templateUrl: './schema-config.component.html',
  styleUrls: ['./schema-config.component.scss'],
})
export class SchemaConfigComponent {
  @Input() allDisabled = false;
  insertOptions = [
    {label: 'Required', value: 1},
    {label: 'Optional', value: 2},
    // {label: 'Late Insert', value: 3},
  ];

  imageOptions = [
    {label: 'Capture', value: 1},
    {label: 'Upload', value: 2},
  ];

  @Input() schema: TaskSchemaJson = {
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
}
