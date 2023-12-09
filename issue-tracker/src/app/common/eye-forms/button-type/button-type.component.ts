import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'eye-button-type',
  templateUrl: './button-type.component.html',
})
export class ButtonTypeComponent extends FieldType {
  onClick($event: any) {
    if (this.to.onClick) {
      this.to.onClick($event, this.to);
    }
  }
}
