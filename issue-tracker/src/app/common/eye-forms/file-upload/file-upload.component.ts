import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'eye-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent extends FieldType {
  onChangeFile(file: any) {
    this.formControl.setValue(file.files);
  }
}
