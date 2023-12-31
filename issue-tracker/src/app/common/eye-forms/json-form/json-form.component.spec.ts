/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JsonFormComponent } from './json-form.component';

describe('JsonFormComponent', () => {
  let component: JsonFormComponent;
  let fixture: ComponentFixture<JsonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
