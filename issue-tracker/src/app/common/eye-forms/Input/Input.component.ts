import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'eye-input',
  templateUrl: './Input.component.html',
  styleUrls: ['./Input.component.scss'],
})
export class InputComponent extends FieldType {
  property!: string;
  public set value(v: any) {
    this.property = v;
    this.formControl.setValue(this.property);
  }
  public get value() {
    this.property = this.formControl.value;
    return this.property;
  }
  onClick($event: any) {
    if (this.to.onClick) {
      this.to.onClick($event);
    }
  }
  onHover($event: any) {
    if (this.to.focusError) {
      this.to.focusError($event);
    }
  }

  onAddonClick($event: any) {
    if (this.to.rightAddon.onAddonClick) {
      this.to.rightAddon.onAddonClick($event);
    }
  }
  onAddonHover($event: any) {
    if (this.to.rightAddon.onAddonFocus) {
      this.to.rightAddon.onAddonFocus($event);
    }
  }

  onUserProfileToggle(over: any, errorMessage: any) {
    if (errorMessage) {
      return true;
    }
    over.hide();
    return false;
  }
}
