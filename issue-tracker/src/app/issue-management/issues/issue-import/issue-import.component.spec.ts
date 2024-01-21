/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IssueImportComponent } from './issue-import.component';

describe('IssueImportComponent', () => {
  let component: IssueImportComponent;
  let fixture: ComponentFixture<IssueImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
