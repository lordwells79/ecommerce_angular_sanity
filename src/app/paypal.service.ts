import { Injectable } from '@angular/core';
import { Cart, ContextService } from './context.service';

@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  cart: Cart = {};
  urlCreate: string = 'http://localhost:3000/api/orders';
  constructor(private contextService: ContextService) {}

  createOrder(data: any) {
    // Order is created on the server and the order id is returned
    return fetch(this.urlCreate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: [
          {
            sku: 'YOUR_PRODUCT_STOCK_KEEPING_UNIT',
            quantity: 'YOUR_PRODUCT_QUANTITY',
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  }
  onApprove(data: any, actions: any) {
    // Order is captured on the server
    return fetch('http://localhost:3000/api/orders/${data.orderID}/capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  }
}
