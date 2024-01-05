import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AppMessageService {
  constructor(private _message: MessageService) {}

  customMessage(
    messages: string[],
    specificSeverity?: 'Error' | 'Success' | 'Info'
  ) {
    const message: Message[] = [];
    messages.forEach((x) => {
      const data: Message = {
        key: 'apiMessage',
        severity: specificSeverity ? specificSeverity.toLowerCase() : 'error',
        summary: specificSeverity ? specificSeverity : 'Error',
        detail: x,
      };
      message.push(data);
    });
    this._message.addAll(message);
    return;
  }
}
