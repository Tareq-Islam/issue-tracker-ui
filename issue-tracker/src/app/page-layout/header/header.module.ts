import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EyeFormsModule } from '@forms/eye-forms.module';
import { SharedModule } from '@shared/shared.module';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';
import { HeaderDropdownComponent } from './dropdown/dropdown.component';
import { HeaderComponent } from './header.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderSearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    RippleModule,
    SharedModule,
    DropdownModule,
    FormsModule,
    EyeFormsModule,
    OverlayPanelModule,
    AvatarModule,
    MenuModule
  ],
  declarations: [
    HeaderComponent,
    HeaderSearchComponent,
    HeaderDropdownComponent,
    ProfileComponent
  ],
  exports: [HeaderComponent, HeaderSearchComponent, HeaderDropdownComponent],
})
export class HeaderModule {}
