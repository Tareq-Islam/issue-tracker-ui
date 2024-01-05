import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';
import { Observable, Subscription, fromEvent, timer, take } from 'rxjs';
import { environment } from 'src/environments/env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  onlineEvent: Observable<Event> | undefined;
  offlineEvent: Observable<Event> | undefined;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string = '';
  connectionStatus: 'online' | 'offline' | undefined;
  constructor(
    private primengConfig: PrimeNGConfig,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    if (environment.production) {
      if (location.protocol === 'http') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
    if (environment.staging) {
      this.setTitle('Staging - Issue Tracker System');
    }

    if (environment.development) {
      this.setTitle('Local - Issue Tracker System');
    }

    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(
      this.onlineEvent.subscribe((e) => {
        this.connectionStatusMessage = 'Back to online';
        this.connectionStatus = 'online';
        timer(2000)
          .pipe(take(1))
          .subscribe((res) => (this.connectionStatus = undefined));
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe((e) => {
        this.connectionStatusMessage =
          'Connection lost! You are not connected to internet';
        this.connectionStatus = 'offline';
      })
    );
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
