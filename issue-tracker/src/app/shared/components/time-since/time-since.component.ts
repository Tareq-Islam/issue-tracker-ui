import { Component, Input, OnInit } from '@angular/core';
import { EyeDate } from '@eye/utilities/date/date.model';

@Component({
  selector: 'eye-time-since',
  templateUrl: './time-since.component.html',
  styleUrls: ['./time-since.component.scss'],
})
export class TimeSinceComponent {
  timer: any;
  @Input() set elapsedTime(v: number) {
    const elapsed = EyeDate.getTimeSinceAgo(v);
    this.timer = elapsed;
  }
}
