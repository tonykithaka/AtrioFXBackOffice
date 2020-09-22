import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { portalLayoutComponent } from './portalLayout.component';

describe('portalLayout', () => {
  let component: portalLayoutComponent;
  let fixture: ComponentFixture<portalLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ portalLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(portalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
