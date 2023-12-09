import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'eye-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent extends FieldType {
  _dateValue!: any;

  public set dateValue(v: string) {
    this._dateValue = v;
    this.formControl.setValue(v);
  }

  public get dateValue(): string {
    this._dateValue = this.formControl.value;
    return this._dateValue;
  }

  constructor(private _sanitizer: DomSanitizer) {
    super();
  }

  contentSecurity(content: any) {
    return this._sanitizer.bypassSecurityTrustHtml(content);
  }
}
