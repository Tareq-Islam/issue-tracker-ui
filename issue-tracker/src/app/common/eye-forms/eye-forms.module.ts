import { TooltipModule } from 'primeng/tooltip';
import { EditorComponent } from './editor/editor.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EyeSharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EyeFormsComponent } from './eye-forms.component';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormValidation } from '@eye/utilities/form/formValidation';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { JsonFormComponent } from './json-form/json-form.component';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { CalendarModule } from 'primeng/calendar';
import { EditorModule } from 'primeng/editor';
import { DividerModule } from 'primeng/divider';
import { AdvancedFileUploadComponent } from './advanced-file-upload/advanced-file-upload.component';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonTypeComponent } from './button-type/button-type.component';
import { InputComponent } from './Input/Input.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';
import { SwitchComponent } from './switch/switch.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownComponent } from './dropdown/dropdown.component';
import { RepeatComponent } from './repeat/repeat.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { PasswordComponent } from './password/password.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputSwitchModule,
    ScrollLayoutModule,
    ButtonModule,
    DividerModule,
    FileUploadModule,
    RippleModule,
    FormsModule,
    AutoCompleteModule,
    EyeSharedModule,
    CalendarModule,
    EditorModule,
    InputTextModule,
    FormlyPrimeNGModule,
    KeyFilterModule,
    OverlayPanelModule,
    DropdownModule,
    PasswordModule,
    MultiSelectModule,
    TooltipModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'repeat',
          component: RepeatComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'input-sep',
          component: InputComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'dropdown',
          component: DropdownComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'switch',
          component: SwitchComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'button',
          component: ButtonTypeComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'autocomplete',
          wrappers: ['form-field'],
          component: AutoCompleteComponent,
        },
        {
          name: 'file',
          component: FileUploadComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'calendar',
          component: CalendarComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'multiFileUploader',
          component: AdvancedFileUploadComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'editor',
          component: EditorComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'multiSelect',
          component: MultiSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'inputPassword',
          component: PasswordComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
  providers: [
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: FormValidation.registerValidationMessages,
    },
  ],
  declarations: [
    EyeFormsComponent,
    AutoCompleteComponent,
    JsonFormComponent,
    FileUploadComponent,
    CalendarComponent,
    EditorComponent,
    AdvancedFileUploadComponent,
    ButtonTypeComponent,
    InputComponent,
    SwitchComponent,
    DropdownComponent,
    RepeatComponent,
    MultiSelectComponent,
    PasswordComponent,
  ],
  exports: [JsonFormComponent],
})
export class EyeFormsModule {}
