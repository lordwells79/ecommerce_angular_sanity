import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPalButtonComponent } from './pay-pal-button.component';

describe('PayPalButtonComponent', () => {
  let component: PayPalButtonComponent;
  let fixture: ComponentFixture<PayPalButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayPalButtonComponent]
    });
    fixture = TestBed.createComponent(PayPalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
