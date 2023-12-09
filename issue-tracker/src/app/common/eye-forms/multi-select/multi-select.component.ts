import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'eye-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent extends FieldType {
  public set value(v: string) {
    this.formControl.setValue(v);
  }
  public get value() {
    return this.formControl.value;
  }

  onClick($event: any) {
    if (this.to.onClick) {
      this.to.onClick($event);
    }
  }

  onChange(event: any) {
    if (this.to.onChange) {
      this.to.onChange(event);
    }
  }

  onFilter(event: any) {
    if (this.to.onFilter) {
      this.to.onFilter(event);
    }
  }
}
