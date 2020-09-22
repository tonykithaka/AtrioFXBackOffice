import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackRequestComponent } from "./callbackRequest.component";

describe('CallbackRequestComponent', () => {
  let component: CallbackRequestComponent;
  let fixture: ComponentFixture<CallbackRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallbackRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
