import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eye-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {
  @Input() styleClass = 'flex justify-between items-center w-screen px-16';
  constructor() {}
}
