import { Component } from '@angular/core';
import { Product, SanityServiceService } from '../sanity-service.service';
import { Output, EventEmitter } from '@angular/core';
import { Cart, ContextService } from '../context.service';

import {
  faChevronLeft,
  faPlus,
  faMinus,
  faTrashCan,
  faBagShopping,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { StripeService } from '../stripe.service';
import { PaypalService } from '../paypal.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  @Output() showCartEvent = new EventEmitter<any>();
  cart: Cart = {
    cartItems: [],
    totalPrice: 0,
    totalQuantities: 0,
  };

  faChevronLeft = faChevronLeft;
  faPlus = faPlus;
  faMinus = faMinus;
  faTrashCan = faTrashCan;
  faCircleXmark = faCircleXmark;
  faBagShopping = faBagShopping;
  qty: number = 1;
  constructor(
    private sanityService: SanityServiceService,
    private contextService: ContextService,
    private stripeService: StripeService,
    private payPalService: PaypalService
  ) {}

  defaultImageURL = '';

  imageUrl(source: any) {
    return source ? this.sanityService.urlFor(source) : this.defaultImageURL;
  }

  ngOnInit(): void {
    this.cart = this.contextService.getCartItems();
  }
  setShowCart(val: boolean) {
    this.contextService.setShowCart(val);
  }
  incQty(product: Product): void {
    if (product.quantity) {
      this.contextService.onAdd(product, 1);
      //product.quantity++;
    }

    this.cart = this.contextService.getCartItems();
    console.log('Inc qty ', this.cart);
  }
  decQty(product: Product): void {
    if (product.quantity === 1) {
      return;
    }
    this.contextService.onUpdateQty(product);
    console.log('Dec qty ', this.cart);
  }
  onRemoveItems(product: Product) {
    this.contextService.onRemoveItems(product);
    console.log('On remove ', this.cart);
  }
  handleStripe() {
    this.stripeService.handlePayment();
  }
  createOrder(data: any) {
    this.payPalService.createOrder(data);
  }
  onApprove(data: any, actions: any) {
    this.payPalService.onApprove(data, actions);
  }
}
