import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ToastModule],
  templateUrl: './core.component.html',
})
export class CoreComponent {}
