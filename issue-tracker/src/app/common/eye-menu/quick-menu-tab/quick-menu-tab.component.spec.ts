/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuickMenuTabComponent } from './quick-menu-tab.component';

describe('QuickMenuTabComponent', () => {
  let component: QuickMenuTabComponent;
  let fixture: ComponentFixture<QuickMenuTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickMenuTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickMenuTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
