import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eye-network-status',
  templateUrl: './network-status.component.html',
  styleUrls: ['./network-status.component.scss']
})
export class NetworkStatusComponent implements OnInit {

  @Input() onlineStatusMessage: string = '';
  @Input() onlineStatus: 'online' | 'offline' | undefined = undefined;
  constructor() { }

  ngOnInit() { 
  }

}
