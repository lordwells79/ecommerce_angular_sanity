import { Injectable } from '@angular/core';
import { Cart, ContextService } from './context.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripeKey: string =
    'pk_test_51LgVyyLzz7lGNntzaromVziEq1qJl2HhM30jSQAcIwv0jhes7VmPXV0Zr45m42JKe9gNyqG3tVA5iRtd3yoGAgDZ0004lIB1ws';
  cart: Cart = {};
  url: string = 'http://localhost:3000/api/checkout_sessions';

  constructor(private contextService: ContextService) {}
  getStripeKey(): string {
    return this.stripeKey;
  }

  async handlePayment() {
    const stripeKey = this.stripeKey;
    const stripe = Stripe(stripeKey);
    this.cart = this.contextService.cart;
    if (!this.cart) {
      console.error('Dati del carrello vuoti');
      return;
    }

    console.log('carrello prima della fetch', this.cart);
    const response = await fetch(
      'http://localhost:3000/api/checkout_sessions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.cart),
      }
    );

    if (response.status === 500) return;

    const data = await response.json();
    console.log(data.sessionId);

    stripe.redirectToCheckout({ sessionId: data.sessionId });
  }
  async handlePaymentPayPal() {}
}
