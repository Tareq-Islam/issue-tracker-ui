import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export interface CalenderOptions {
  minDate?: Date;
  maxDate?: Date;
  readonlyInput?: boolean;
  defaultDate?: Date;
  selectionMode?: any;
  style?: any;
  styleClass?: string;
  inputStyle?: any;
  inputStyleClass?: string;
  inputId?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: string;
  inline?: boolean;
  showOtherMonths?: boolean;
  selectOtherMonths?: boolean;
  showIcon?: boolean;
  showOnFocus?: boolean;
  showWeek?: boolean;
  icon?: string;
  appendTo?: any;
  shortYearCutoff?: string;
  disabledDates?: Array<Date>;
  disabledDays?: Array<number>;
  showTime?: boolean;
  hourFormat?: string;
  timeOnly?: boolean;
  timeSeparator?: string;
  dataType?: string;
  required?: boolean;
  tabindex?: number;
  showSeconds?: boolean;
  stepHour?: number;
  stepMinute?: number;
  stepSecond?: number;
  maxDateCount?: number;
  showButtonBar?: boolean;
  todayButtonStyleClass?: string;
  clearButtonStyleClass?: string;
  panelStyleClass?: string;
  panelStyle?: object;
  keepInvalid?: boolean;
  hideOnDateTimeSelect?: boolean;
  numberOfMonths?: number;
  view?: 'date' | 'month' | 'year';
  multipleSeparator?: string;
  rangeSeparator?: string;
  focusTrap?: boolean;
  firstDayOfWeek?: number;
}

@Component({
  selector: 'eye-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Input() calenderOptions!: CalenderOptions;
  @Input() dateValue: Date | undefined;
  @Output() dateValueChange = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelect = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onFocus = new EventEmitter(); // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClose = new EventEmitter(); // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onShow = new EventEmitter(); // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClickOutside = new EventEmitter(); // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInput = new EventEmitter(); // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onMonthChange = new EventEmitter(); // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onYearChange = new EventEmitter();
  minDate = new Date('1/1/1970');
  maxDate = new Date('1/1/3225');
  defaultDate = new Date();
  constructor() {}
}
