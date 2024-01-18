import { Component, Input } from '@angular/core';
import { faMicrochip } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'eye-issue-status-icons',
  templateUrl: './issue-status-icons.component.html',
  styleUrls: ['./issue-status-icons.component.scss']
})
export class IssueStatusIconsComponent {
  faMicrochip = faMicrochip;
  @Input() comment:any;
  constructor() { }

  networkChecker(network:any, online:any) {
    if (online > 0) {
      if (network < 5) {
        return '0';
      } else if (network > 4 && network < 10) {
        return '1';
      } else if (network > 9 && network < 15) {
        return '2';
      } else if (network > 14 && network < 20) {
        return '3';
      } else if (network > 19 && network < 25) {
        return '4';
      } else if (network > 24) {
        return '5';
      } else{
        return 'no';
      }
    } else {
      return 'no';
    }
  }

  readerFaultChecker(status:any, selector:any) {

    if (selector === 'indoor') {
      if (status === 1) {
        return 'green';
      } else if (status === 2) {
        return 'red';
      } else if (status === 0) {
        return '';
      }
      else {
        return '';
      }

    } else if (selector === 'outdoor') {
      if (status === 1) {
        return 'green';
      } else if (status === 2) {
        return 'red';
      } else if (status === 0) {
        return '';
      }
      else {return '';}
    }
    else {return '';}

  }

  lockStatusChecker(data:any) {
    if (data > 0 && data === 1) {
      return 'close';
    } else if (data === 2) {
      return 'open';
    } else if (data === 3) {
      return 'fail';
    } else if (data === 4) {
      return 'fail';
    } else if (data === 5) {
      return 'fault';
    }
    else{return '';}
  }

  doorOpenStatusChecker(data:any) {
    if (data > 0 && data === 1) {
      return 'close';
    } else if (data === 2) {
      return 'open';
    }
    else {return 'open';}
  }

}
