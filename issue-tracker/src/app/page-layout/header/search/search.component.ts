import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../service/header.service';

@Component({
  selector: 'eye-header-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class HeaderSearchComponent {
  constructor(public header: HeaderService) {}
  onTypeheadMenuChange(event: any, searchConfig: any) {
    if (searchConfig && searchConfig.menuChange) {
      searchConfig.menuChange.emit(event);
    }
  }
}
