import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IPayPalConfig,
  ICreateOrderRequest,
  IClientAuthorizeCallbackData,
} from 'ngx-paypal';

import { HttpClient } from '@angular/common/http';
import { Cart, ContextService } from '../context.service';
@Component({
  selector: 'app-pay-pal-button',
  templateUrl: './pay-pal-button.component.html',
  styleUrls: ['./pay-pal-button.component.css'],
})
export class PayPalButtonComponent {
  public payPalConfig?: IPayPalConfig;
  cart: Cart = {};

  constructor(
    private http: HttpClient,
    private contextService: ContextService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cart = this.contextService.cart;

    this.payPalConfig = {
      currency: 'EUR',
      clientId:
        'AcSI5h8u49XhtqWW5zHgTPzoLwjQjfVYdl2MmMU3qtPB1zAtplWwxOZM5XWZvWilkUuaMCGrStpI6F6N',
      createOrderOnServer: (data) => {
        console.log('CREATING ORDER', { data });
        return fetch('http://localhost:3000/api/paypal', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json', // Imposta l'header Content-Type
          },
          body: JSON.stringify(this.cart),
        })
          .then((res) => res.json())
          .then((response) => {
            console.log('GOT 1 ', { response });
            return response.id;
          });
      },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data: any) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        var transaction = data.purchase_units[0].payments.captures[0];

        console.log('transiction ', transaction);
        this.contextService.setShowCart(false);
        this.contextService.clearCart();
        this.paypalRedirect(transaction.status, data.id);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  paypalRedirect(status: any, orderRef: any) {
    switch (status) {
      case 'COMPLETED':
        this.router.navigate(['/success']);
        break;
      case 'ERROR':
        this.router.navigate(['/result/error/' + orderRef]);
        break;
      default:
        this.router.navigate(['/result/error/' + orderRef]);
        break;
    }
  }
}
