import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'eye-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent extends FieldType {
  public set checked(v: string) {
    this.formControl.setValue(v);
  }
  public get checked() {
    return this.formControl.value;
  }
}
