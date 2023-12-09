import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'eye-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
})
export class JsonFormComponent {
  @Input() form = new UntypedFormGroup({});
  @Input() model: any = {};
  @Input() options: FormlyFormOptions = {
    resetModel: this.model,
  };
  @Input() fields: FormlyFieldConfig[] = [];
  @Input() bodyHeight = 'calc(100vh - 172px)'; // 440px
  @Input() styleClass = 'px-8 w-full';
  @Input() footer: {
    isFooter?: boolean;
    submitLabel?: string;
    isSubmitLoading?: boolean;
    isSubmitDisabled?: boolean;
    iconPos?: 'left' | 'right' | 'top' | 'bottom';
    isReset?: boolean;
    resetLabel?: string;
  } = {
    isFooter: true,
    isReset: true,
  };
  @Output() formSubmit = new EventEmitter();

  onSubmit(model: any) {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  onResetForm() {
    if (this.options) this.options.resetModel;
    this.form.reset();
    this.form.updateValueAndValidity();
  }
}
