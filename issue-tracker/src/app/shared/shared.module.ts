import { AvatarModule } from 'primeng/avatar';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModalComponent } from './components/modal/modal.component';
import { RouterModule } from '@angular/router';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SearchComponent } from './components/search/search.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenuModule } from 'primeng/menu';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TypeheadComponent } from './components/typehead/typehead.component';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { OptionsSelectorComponent } from './components/options-selector/options-selector.component';
import { DropdownModule } from 'primeng/dropdown';
import { EditorComponent } from './components/editor/editor.component';
import { EditorModule } from 'primeng/editor';
import { SkeletonModule } from 'primeng/skeleton';

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { StatusImgsComponent } from './components/status-imgs/status-imgs.component';
import { ElapsedObserveTimerComponent } from './components/elapsed-observe-timer/elapsed-observe-timer.component';
import { TimeSinceObserveTimerComponent } from './components/time-since-observe-timer/time-since-observe-timer.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { TimeSinceComponent } from './components/time-since/time-since.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    AutoCompleteModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    KeyFilterModule,
    ChipModule,
    RouterModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    SkeletonModule,
    OverlayPanelModule,
    AvatarModule,
    TooltipModule,
    CalendarModule,
  ],

  declarations: [
    SharedComponent,
    RouteNotFoundComponent,
    SearchComponent,
    TypeheadComponent,
    FilterBarComponent,
    ModalComponent,
    OptionsSelectorComponent,
    EditorComponent,
    NotFoundComponent,
    StatusImgsComponent,
    ElapsedObserveTimerComponent,
    TimeSinceObserveTimerComponent,
    CalendarComponent,
    TimeSinceComponent,
  ],
  exports: [
    RouteNotFoundComponent,
    SearchComponent,
    TypeheadComponent,
    FilterBarComponent,
    ModalComponent,
    OptionsSelectorComponent,
    EditorComponent,
    NotFoundComponent,
    StatusImgsComponent,
    ElapsedObserveTimerComponent,
    TimeSinceObserveTimerComponent,
    CalendarComponent,
    TimeSinceComponent,
  ],
})
export class SharedModule {}
