import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EyeSidebarService } from './service/sidebar.service';

@Component({
  selector: 'eye-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  _sidebarCloseEventSubscription = new Subscription();
  @Input() isHandset = false;
  constructor(private _sidebar: EyeSidebarService) {}

  ngOnInit(): void {
    const sidebar = document.getElementById('sidebar');
    this._sidebarCloseEventSubscription =
      this._sidebar.sidebarCloseEvent.subscribe((res) => {
        if (this.isHandset) {
          if (sidebar?.classList.contains('flex')) {
            sidebar?.classList.remove('flex');
            sidebar?.classList.add('hidden');
          } else {
            sidebar?.classList.add('absolute');
            sidebar?.classList.replace('w-[90px]', 'w-[250px]');
            sidebar?.classList.remove('hidden');
            sidebar?.classList.add('flex');
          }
        } else {
          sidebar?.classList.remove('absolute');
          sidebar?.classList.remove(res ? 'w-[250px]' : 'w-[90px]');
          sidebar?.classList.add(res ? 'w-[90px]' : 'w-[250px]');
        }
      });
    sidebar?.addEventListener('mouseenter', () => {
      if (!this.isHandset) {
        if (!this._sidebar.toggle) {
          this._sidebar.onMouseHover(false);
          sidebar?.classList.replace('w-[90px]', 'w-[250px]');
          sidebar?.classList.add('absolute');
        }
      }
    });
    sidebar?.addEventListener('mouseleave', () => {
      if (!this.isHandset) {
        if (!this._sidebar.toggle) {
          this._sidebar.onMouseHover(true);
          sidebar?.classList.replace('w-[250px]', 'w-[90px]');
          sidebar?.classList.remove('absolute');
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this._sidebarCloseEventSubscription) {
      this._sidebarCloseEventSubscription.unsubscribe();
    }
  }
}
