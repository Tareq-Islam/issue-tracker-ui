import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'eye-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent extends FieldType {
  public set text(v: string) {
    this.formControl.setValue(v);
  }

  public get text(): string {
    return this.formControl.value;
  }
  constructor(private _sanitizer: DomSanitizer) {
    super();
  }

  contentSecurity(content: any) {
    return this._sanitizer.bypassSecurityTrustHtml(content);
  }
}
