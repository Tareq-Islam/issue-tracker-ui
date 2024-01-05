import { Component, OnDestroy, Input } from '@angular/core';
import { EyeDate } from '@core/utils/date/date.model';
import { Subscription, timer } from 'rxjs';
@Component({
  selector: 'eye-time-since-observe-timer',
  templateUrl: './time-since-observe-timer.component.html',
  styleUrls: ['./time-since-observe-timer.component.scss']
})
export class TimeSinceObserveTimerComponent implements OnDestroy {
  timer: any;
  subscription!: Subscription;
  @Input() set elapsedTime(v: number) {
    this.unSubscribe();
    this.subscription = timer(0, 1000).subscribe((time) => {
      const elapsed = EyeDate.getTimeSinceAgo(time + v);
      this.timer = elapsed;
    });
  }
  unSubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  ngOnDestroy() {
    this.unSubscribe();
  }
}
