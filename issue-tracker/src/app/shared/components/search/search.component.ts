import { MenuItem } from 'primeng/api';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

export interface EyeMenus extends MenuItem {
  keyFilter?: 'alphanum' | 'num' | 'email' | 'alpha' | 'noSpecial';
  placeholder?: string;
  search?: (
    event: { keyword: string; item: EyeMenus; originalEvent?: any } | null
  ) => void;
}

@Component({
  selector: 'eye-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  items: MenuItem[] = [];
  _search: string = '';
  selectedItem: EyeMenus = {
    label: 'Search',
    keyFilter: 'alphanum',
    placeholder: 'type here...',
  };
  filterTextChanged: Subject<string> = new Subject<string>();
  btnLabel = this.selectedItem.label;
  keyFilter: 'alphanum' | 'num' | 'email' | 'alpha' | 'noSpecial' | undefined =
    this.selectedItem.keyFilter;
  pValidateOnly = this.keyFilter === 'noSpecial';
  _menu: EyeMenus[] = [];
  _isLoading = false;
  _placeholder: string = this.selectedItem.placeholder || 'type here...';
  inputPlaceholder = this._placeholder;

  @Input() appendTo!: string;
  @Input() menuStyle!: string;
  @Input() menuStyleClass!: string;

  @Input() set search(v: string) {
    this._search = v;
  }

  @Input() set placeholder(v: string) {
    this._placeholder = v;
  }

  @Input() set isLoading(v: boolean) {
    this._isLoading = v;
  }

  @Input() set menus(v: EyeMenus[]) {
    this._search = '';
    this._menu = v;
    this.items = [];
    if (v.length > 1) {
      this.items = v.map((x) => {
        return {
          ...x,
          command: ({ item }) => {
            this._search = '';
            this.selectedItem = item;
            this.selectMenuItem.emit();
            this.onSetSearchFields({
              btnLabel: item.label,
              keyFilter: item.keyFilter,
              inputPlaceholder: item.placeholder || this._placeholder,
            });
          },
        };
      });
      this.selectedItem = v[0];
      this.onSetSearchFields({
        btnLabel: v[0].label || 'Search',
        keyFilter: v[0].keyFilter,
        inputPlaceholder: v[0].placeholder || this._placeholder,
      });
    }

    if (v.length === 1) {
      this.selectedItem = v[0];
      this.onSetSearchFields({
        btnLabel: v[0].label || 'Search',
        keyFilter: v[0].keyFilter,
        inputPlaceholder: v[0].placeholder || this._placeholder,
      });
    }
  }

  @Output() eSearch = new EventEmitter<{
    keyword: string;
    item: EyeMenus;
    originalEvent?: any;
  } | null>();

  @Output() selectMenuItem: EventEmitter<{ item: EyeMenus }> =
    new EventEmitter<{ item: EyeMenus }>();

  private _nullCount = 0;
  private _originalEvent!: any;
  onSetSearchFields({
    btnLabel,
    keyFilter,
    inputPlaceholder,
  }: {
    btnLabel: string;
    keyFilter?: 'alphanum' | 'num' | 'email' | 'alpha' | 'noSpecial';
    inputPlaceholder: string;
  }) {
    this.keyFilter = keyFilter;
    this.btnLabel = btnLabel;
    this.inputPlaceholder = inputPlaceholder;
    this.pValidateOnly = this.keyFilter === 'noSpecial';
    this._nullCount = 0;
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
                originalEvent: this._originalEvent,
              });
            }
            this.eSearch.emit({
              keyword: filterQuery,
              item: this.selectedItem,
              originalEvent: this._originalEvent,
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

  onChange(event: any) {
    this._originalEvent = event;
    if (event) {
      this._nullCount = 0;
      this.onFilterTextChanged(event);
    }
    if (!event) {
      this._nullCount = this._nullCount + 1;
      if (this.selectedItem && this.selectedItem.search) {
        this.selectedItem.search(null);
      }
      this.eSearch.emit(null);
    }
  }
}
