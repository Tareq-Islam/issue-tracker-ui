import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'eye-advanced-file-upload',
  templateUrl: './advanced-file-upload.component.html',
  styleUrls: ['./advanced-file-upload.component.scss'],
})
export class AdvancedFileUploadComponent extends FieldType {
  public set _image(v: any[]) {
    this.formControl.setValue(v);
  }

  rawUploader: any;

  onClearFile(uploader: FileUpload) {
    uploader.files = [];
  }

  selectedFile(event: any, uploader: FileUpload) {
    this.rawUploader = uploader;
    this._image = uploader.files;
  }

  clearFile(event: any, uploader: FileUpload) {
    this.rawUploader = uploader;
    this._image = uploader.files;
  }

  // uploaded image remove
  removeFile(event: any, file: File, uploader: FileUpload) {
    this.rawUploader = uploader;
    const index = uploader.files.indexOf(file);
    uploader.remove(event, index);
  }
}
