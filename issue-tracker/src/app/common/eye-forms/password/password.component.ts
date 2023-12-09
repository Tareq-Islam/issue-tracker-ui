import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'eye-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent extends FieldType {
  public set value(v: string) {
    this.formControl.setValue(v);
  }
  public get value() {
    return this.formControl.value;
  }

  onModelChange(event: any) {
    if (this.to && this.to.keydown) {
      this.to.keydown(this.field, event);
    }
  }
}
