import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalDetailsComponent } from './signalDetails.component';

describe('SignalDetailsComponent', () => {
  let component: SignalDetailsComponent;
  let fixture: ComponentFixture<SignalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
