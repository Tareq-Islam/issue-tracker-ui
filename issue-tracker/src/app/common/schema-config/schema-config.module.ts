import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { SchemaConfigModalComponent } from './schema-config-modal/schema-config-modal.component';
import { SchemaConfigComponent } from './schema-config.component';

@NgModule({
  imports: [
    CommonModule,
    InputSwitchModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    RippleModule,
    ScrollLayoutModule
  ],
  declarations: [SchemaConfigComponent, SchemaConfigModalComponent],
  exports: [SchemaConfigComponent]
})
export class SchemaConfigModule { }
