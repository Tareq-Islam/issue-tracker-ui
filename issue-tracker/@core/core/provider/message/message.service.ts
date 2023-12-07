import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isArrayBuffer } from 'lodash';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class EyeMessageService {
  constructor(private _message: MessageService) {}

  customMessage(
    errorMessage: string,
    specificSeverity?: 'Error' | 'Success' | 'Info'
  ) {
    const data: Message = {
      key: 'apiMessage',
      severity: specificSeverity ? specificSeverity.toLowerCase() : 'error',
      summary: specificSeverity ? specificSeverity : 'Error',
      detail: errorMessage,
    };
    this._message.add(data);
    return;
  }

  errorHandle(
    error: HttpErrorResponse,
    specificSeverity?: 'Error' | 'Success' | 'Info'
  ) {
    let errorMessage: any[];
    const serverError = 'Server Not Found!!!';

    if (!isArrayBuffer(error.error)) {
      errorMessage =
        error.status === 0
          ? [serverError]
          : typeof error.error.message === 'string'
          ? [error.error.message]
          : [error.error.message];
    } else {
      errorMessage = ['Opration Failed.'];
    }

    if (error.status === 0 || error.status > 499) {
      this.toaster(errorMessage, specificSeverity);
      return;
    }

    if (error.status > 399 && error.status === 401) {
      this.toaster(errorMessage, specificSeverity);
      return;
    }

    if (error.status > 399 && error.status === 400) {
      this.toaster(errorMessage, specificSeverity);
      return;
    }

    if (error.status > 399 && error.status === 404) {
      this.toaster(errorMessage, specificSeverity);
      return;
    }

    if (error.status > 399 && error.status === 403) {
      this.toaster(errorMessage, specificSeverity);
      return;
    }

    if (error.status > 399 && error.status === 409) {
      this.toaster(errorMessage, specificSeverity);
      return;
    }
  }
  successHandle(
    success: any,
    severity: 'Error' | 'Success' | 'Info' = 'Success'
  ) {
    let message: any[] = [];
    if (!success) {
      message = ['Data not found.'];
      this.toaster(message, (severity = 'Info'));
    } else if (success && !isArrayBuffer(success)) {
      message =
        typeof success.message === 'string'
          ? [success.message]
          : [success.message];
      this.toaster(message, (severity = 'Success'));
    }
  }

  private toaster(
    messages: string[],
    severity: 'Error' | 'Success' | 'Info' = 'Error'
  ) {
    const message: Message[] = [];
    messages.forEach((x) => {
      const data: Message = {
        key: 'apiMessage',
        severity: severity.toLowerCase(),
        summary: severity,
        detail: x,
      };
      message.push(data);
    });
    this._message.addAll(message);
  }
}
