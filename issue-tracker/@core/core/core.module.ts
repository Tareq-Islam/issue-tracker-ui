import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './interceptores/auth-api-interceptores.service';
import { EyeMessageService } from './provider/message/message.service';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [authInterceptorProviders, EyeMessageService, MessageService],
  declarations: [CoreComponent]
})
export class CoreModule { }
