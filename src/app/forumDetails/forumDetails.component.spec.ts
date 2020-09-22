import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  ForumDetailsComponent } from './forumDetails.component';

describe('ForumComponent', () => {
  let component: ForumDetailsComponent;
  let fixture: ComponentFixture<ForumDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
