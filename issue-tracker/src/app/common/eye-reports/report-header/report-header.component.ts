import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { CalenderOptions } from '@shared/components/calendar/calendar.component';
import { TypeheadMenus } from '@shared/components/typehead/typehead.component';

export interface ReportHeaderButton {
  isEnable: boolean;
  label: string;
  disabled?: boolean;
  icon?: string;
  iconPos?: 'left' | 'right' | 'top' | 'bottom';
  isLoading?: boolean;
  onClick?: (event: {originalEvent?: any, item?: ReportHeaderButton}) => void;
}

export interface ReportHeaderCalendar {
  isEnable: boolean;
  label: string;
  styleClass?: string;
  labelStyleClass?: string;
  defaultDate?: Date | undefined;
  options?: CalenderOptions;
  onSelect?: (event: {originalEvent?: any, item?: ReportHeaderCalendar}) => void;
  onInput?: (event: {originalEvent?: any, item?: ReportHeaderCalendar}) => void;
}

export interface ReportHeaderConfiguration {
  search?: {
    isSearch: boolean;
    menus?: TypeheadMenus[];
    menuChange?: (e: TypeheadMenus) => void;
    appendTo?: any;
    isLoading?: boolean;
    isShowEmptyMessage?: boolean;
    isCustomTemplate?: boolean;
    isDisabled?: boolean;
    defaultValue?: any;
    result?: { name: string; value: any }[] | any[];
  }[];
  calendar?: {
    wrapperClass?: string;
    date: ReportHeaderCalendar[];
  };
  button?: {
    wrapperClass?: string;
    buttons: ReportHeaderButton[];
  };
}

@Component({
  selector: 'eye-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.scss'],
})
export class ReportHeaderComponent {
  @ContentChild('typeheadTemplate') typeTemplate!: TemplateRef<any>;
  @Input() config!: ReportHeaderConfiguration;
  defaultDateView = new Date();
  onSelect(event: any, item: ReportHeaderCalendar) {
    if (item && item.onSelect) {
      item.onSelect({originalEvent: event, item});
    }
  }

  onInputChange(event: any, item: ReportHeaderCalendar) {
    if (item && item.onInput) {
      item.onInput({originalEvent: event, item});
    }
  }

  onSearch(event: any, item: ReportHeaderButton) {
    if (item && item.onClick) {
      item.onClick({originalEvent: event, item});
    }
  }

  onMenuChange(event: any, item: any) {
    if (event && item.menuChange) {
      item.menuChange(event);
    }
  }
}
