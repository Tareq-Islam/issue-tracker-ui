import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  isHandset = false;
  appCode = '1.0.0';
}
