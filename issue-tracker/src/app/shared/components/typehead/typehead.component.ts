import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { debounceTime, Subject, Observable } from 'rxjs';
import { Typehead } from './typehead.model';

export interface TypeheadMenus extends MenuItem, Typehead {}

export interface TypeheadSearchResult {
  keyword: string;
  item: TypeheadMenus;
  originalEvent?: InputEvent;
}

@Component({
  selector: 'eye-typehead',
  templateUrl: './typehead.component.html',
  styleUrls: ['./typehead.component.scss'],
})

export class TypeheadComponent {
  @Input() wrapperStyleClass!: string;
  @Input() isCustomTemplate = false;
  @Input() typeheadDisabled = false;
  @Input() dropdownMenuAppendTo: any = null;
 /**
 * @description Custom Templating.
 * @implements Must be isCustomTeplate true when you are using custom template.
 *
 * @example
 * <ng-template #eTemplate let-item>
 *  <div>{{item}}</div>
 * </ng-template>
 *
 *
 */
  @ContentChild('eTemplate') optionTemplate!: TemplateRef<any>;
  results: any[] = [];
  @Input() set suggestionItems (v: any) {
    this.results = v;
  }
  @Input() appendTo: any = null;
  @Input() scrollHeight: string = '200px';
  @Input() panelStyle!: any;
  @Input() panelStyleClass: string = 'right-[-32px] left-auto min-w-[266px]';
  @Input() inputStyle = {width: '200px'};
  // menu
  items: MenuItem[] = [];
  _search: any = {};
  selectedItem: TypeheadMenus = {
    label: 'Search',
    placeholder: 'type here...',
  };
  filterTextChanged: Subject<string> = new Subject<string>();
  btnLabel = this.selectedItem.label;
  _menu: TypeheadMenus[] = [];
  _isLoading = false;
  _placeholder: string = this.selectedItem.placeholder || 'type here...';
  inputPlaceholder = this._placeholder;

  @Input() menuStyle!: string;
  @Input() menuStyleClass!: string;

  @Input() set search(v: any) {
    this._search = v;
  }

  @Input() showEmptyMessage = true;

  @Input() set placeholder(v: string) {
    this._placeholder = v;
  }

  @Input() set isLoading(v: boolean) {
    this._isLoading = v;
  }
  @Input() set menus(v: TypeheadMenus[]) {
    this._search = {};
    this._menu = v;
    this.items = [];
    this.suggestionItems = [];
    if (v.length > 1) {
      this.items = v.map((x) => {
        return {
          ...x,
          command: ({ item }) => {
            this._search = {};
            this.selectedItem = item;
            this.onSetSearchFields({
              btnLabel: item.label,
              inputPlaceholder: item.placeholder || this._placeholder,
            });
            this.menuChange.emit(item);
          },
        };
      });
      this.selectedItem = v[0];
      this.onSetSearchFields({
        btnLabel: v[0].label || 'Search',
        inputPlaceholder: v[0].placeholder || this._placeholder,
      });
    }

    if (v.length === 1) {
      this.selectedItem = v[0];
      this.onSetSearchFields({
        btnLabel: v[0].label || 'Search',
        inputPlaceholder: v[0].placeholder || this._placeholder,
      });
    }
  }
  @Output() eSearch: EventEmitter<{
    keyword: string;
    item: TypeheadMenus;
    originalEvent?: InputEvent;
  } | null> = new EventEmitter<{ keyword: string; item: TypeheadMenus; originalEvent?: InputEvent } | null>();

  @Output() selectItem: EventEmitter<any> = new EventEmitter();
  @Output() menuChange: EventEmitter<any> = new EventEmitter();
  private _nullCount = 0;
  private _originalEvent: InputEvent | undefined;
  onSetSearchFields({
    btnLabel,
    inputPlaceholder,
  }: {
    btnLabel: string;
    inputPlaceholder: string;
  }) {
    this.btnLabel = btnLabel;
    this.inputPlaceholder = inputPlaceholder;
  }

  onFilterTextChanged(filterText: string) {
    if (this.filterTextChanged.observers.length === 0) {
      this.filterTextChanged
        .pipe(debounceTime(500))
        .subscribe((filterQuery) => {
          if (this._nullCount === 0) {
            if (this.selectedItem && this.selectedItem.search) {
              this.selectedItem.search({
                keyword: filterQuery,
                item: this.selectedItem,
                originalEvent: this._originalEvent
              });
            }
            this.eSearch.emit({
              keyword: filterQuery,
              item: this.selectedItem,
              originalEvent: this._originalEvent
            });
          }
        });
    }
    this.filterTextChanged.next(filterText);
  }

  toggle(menu: any, event: any) {
    if (this._menu.length > 1) {
      menu.toggle(event);
    }
  }

  onChange(event: {originalEvent: InputEvent, query: string}) {
    if (event) {
      this._nullCount = 0;
      this._originalEvent = event.originalEvent;
      this.onFilterTextChanged(event.query);
    }
  }
  onClear() {
    this._nullCount = this._nullCount + 1;
    if (this.selectedItem && this.selectedItem.search) {
      this.selectedItem.search(null);
    }
    this.eSearch.emit(null);
  }

  onSelect(event: any) {
    this.selectItem.emit(event);
    if (this.selectedItem && this.selectedItem.searchItemSelected) {
      this.selectedItem.searchItemSelected(event);
    }
  }
}
