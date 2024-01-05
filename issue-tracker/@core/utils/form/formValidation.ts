import { AbstractControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormValidation {
  static registerValidationMessages() {
    return {
      validationMessages: [
        {
          name: 'required',
          message: 'This field is required',
        },
        {
          name: 'minLength',
          message: (field: any) =>
            `Should have atleast ${field.requiredLength} characters`,
        },
        {
          name: 'maxLength',
          message: (field: any) =>
            `This value should be less than ${field.requiredLength} characters`,
        },
        {
          name: 'min',
          message: (field: any) =>
            `This value should be more than ${Number(field.min) - 1}`,
        },
        {
          name: 'max',
          message: (field: any) =>
            `This value should be less than ${field.max}`,
        },
      ],
    };
  }
  static validation(message: string) {
    return {
      messages: {
        pattern: (error: any, field: FormlyFieldConfig) =>
          `"${field.formControl?.value}" ${message}`,
      },
    };
  }

  static onlyNumberValidation() {
    return {
      expression: (c: any) => !c.value || /^\d+$/.test(c.value),
      message: (error: any, field: FormlyFieldConfig) =>
        `"${field.formControl?.value}" is not a valid number`,
    };
  }

  static fileFormatValidation(c: any, extName: any) {
    if (c.value && c.value.length === 1) {
      const value = c.value ? c.value[0].name.split('.') : [];
      return value.includes(extName);
    }
    if (c.value && c.value.length > 1) {
      const format = [];
      for (let index = 0; index < c.value.length; index++) {
        const element = c.value[index];
        const value = c.value ? element.name.split('.') : [];
        format.push(value[1]);
      }

      const exitsAnotherFormat = format.filter((x) => x !== extName);
      return exitsAnotherFormat
        ? exitsAnotherFormat.length > 0
          ? false
          : true
        : true;
    }
  }
}
