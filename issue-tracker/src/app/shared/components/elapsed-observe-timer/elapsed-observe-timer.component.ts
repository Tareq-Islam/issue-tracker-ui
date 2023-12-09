import { Component, Input, OnDestroy } from '@angular/core';
import Utility from '@eye/utilities/utilites.model';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'eye-elapsed-observe-timer',
  templateUrl: './elapsed-observe-timer.component.html',
  styleUrls: ['./elapsed-observe-timer.component.scss'],
})
export class ElapsedObserveTimerComponent implements OnDestroy {
  itemTimer: any;
  subscription!: Subscription;
  @Input() isReverse = false;
  @Input() set elapsedTime(v: number) {
    this.unSubscribe();
    this.subscription = timer(0, 1000).subscribe((time) => {
      const elapsed = Utility.genSecToObject(this.isReverse ? v - time : time + v);
      this.itemTimer = `${elapsed.hr}:${elapsed.mm}:${elapsed.sec}`;
    });
  }
  constructor() {}
  unSubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnDestroy() {
    this.unSubscribe();
  }
}
