import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserManual } from './model/user-manual.model';

@Component({
  selector: 'eye-user-manual',
  templateUrl: './user-manual.component.html',
  styleUrls: ['./user-manual.component.scss'],

})
export class UserManualComponent implements OnInit, OnDestroy {
  userManual: UserManual[] = [];
  selected: UserManual | undefined = undefined;
  constructor(private _config: DynamicDialogConfig) {}

  ngOnDestroy(): void {
    this.userManual = [];
    this.selected = undefined;
  }
  ngOnInit(): void {
    if (this._config.data && this._config.data.userManual) {
      this.userManual = this._config.data.userManual;
      this.selected = this.userManual[0];
    }
  }
}
