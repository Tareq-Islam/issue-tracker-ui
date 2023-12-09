import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'eye-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent extends FieldType {
  public set select(v: string) {
    this.formControl.setValue(v);
  }

  public get select(): string {
    return this.formControl.value;
  }

  onChange(event: any) {
    if (this.to.change) {
      this.to.change(event, this.field);
    }
  }
}
