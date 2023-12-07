import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _isToggleBtnClick = true;
  private _isSidebarClose = false;

  public get toggle(): boolean {
    return this._isToggleBtnClick;
  }

  public get isSidebarClose(): boolean {
    return this._isSidebarClose;
  }

  private _sidebarCloseEvent = new EventEmitter<boolean>();

  public get sidebarCloseEvent(): EventEmitter<boolean> {
    return this._sidebarCloseEvent;
  }
  mouseHoverEvent = new EventEmitter<boolean>();
  constructor() {}

  onSidebarClose(toggle: boolean) {
    this._isSidebarClose = toggle;
    this.sidebarCloseEvent.emit(toggle);
  }

  onMouseHover(isHover: boolean) {
    this._isSidebarClose = isHover;
    this.mouseHoverEvent.emit(isHover);
  }

  onSidebarToggle(toggle: boolean) {
    this._isToggleBtnClick = toggle;
  }
}
