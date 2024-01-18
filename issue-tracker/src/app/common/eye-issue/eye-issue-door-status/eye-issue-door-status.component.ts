import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'eye-issue-door-status',
  templateUrl: './eye-issue-door-status.component.html',
  styleUrls: ['./eye-issue-door-status.component.scss']
})
export class EyeIssueDoorStatusComponent {

  lockStatus: string[] = [
    'Unknown',
    'Lock Close',
    'Lock Open',
    'Lock Open Failed',
    'Lock Close Failed',
    'Lock Fault',
  ];

  faBell = faBell;
  @Input() currentStatus:any;
  @Input() commentUserName:any;
  @Output() modalClose = new EventEmitter<any>();
  @Input() isStatusDetailsModalOpen:boolean = false;
  constructor() { }

  onModalClose(isClose:boolean){
    this.modalClose.emit(isClose);
  }
  onCalDuration(duration: number) {
    return this.formatDurationHMS(duration * 1000);
  }

  formatDurationHMS(duration: number) {
    // eslint-disable-next-line no-use-before-define
    const time = parseDuration(duration);
    // eslint-disable-next-line no-use-before-define
    return formatTimeHMS(time);
  }


}


function formatTimeHMS(o: {
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  milliseconds?: any;
}) {
  let hours = o.hours.toString();
  if (hours.length === 1) hours = '0' + hours;

  let minutes = o.minutes.toString();
  if (minutes.length === 1) minutes = '0' + minutes;

  let seconds = o.seconds.toString();
  if (seconds.length === 1) seconds = '0' + seconds;

  const days = o.days.toString();
  if (Number(days) !== 0) {
    return days + ' days ' + hours + ':' + minutes + ':' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
}

function parseDuration(duration: number) {
  let remain = duration;

  const days = Math.floor(remain / (1000 * 60 * 60 * 24));
  remain = remain % (1000 * 60 * 60 * 24);

  const hours = Math.floor(remain / (1000 * 60 * 60));
  remain = remain % (1000 * 60 * 60);

  const minutes = Math.floor(remain / (1000 * 60));
  remain = remain % (1000 * 60);

  const seconds = Math.floor(remain / 1000);
  remain = remain % 1000;

  const milliseconds = remain;

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}
