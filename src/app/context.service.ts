import { EventEmitter, Injectable, Output } from '@angular/core';
import { Product } from './sanity-service.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface Cart {
  cartItems?: Product[];
  totalPrice?: number;
  totalQuantities?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  @Output() itemsUpdateEvent = new EventEmitter<any>();
  private cartItemCountSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  private showCartEvent = new Subject<boolean>();
  showcartEvent$ = this.showCartEvent.asObservable();

  cart: Cart = {
    cartItems: [],
    totalPrice: 0,
    totalQuantities: 0,
  };
  constructor() {}

  getCartItemCount(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }

  setShowCart(val: boolean) {
    this.showCartEvent.next(val);
  }
  clearCart(): void {
    this.cart = {
      cartItems: [],
      totalPrice: 0,
      totalQuantities: 0,
    };
    this.cartItemCountSubject.next(this.cart.totalQuantities!);
  }

  onAdd(product: Product, quantity: number) {
    const checkProductInCart = this.cart.cartItems!.find(
      (item) => item.slug?.current === product.slug?.current
    );
    if (checkProductInCart) {
      //console.log('presente');
      this.cart.cartItems!.map((cartProduct) => {
        if (cartProduct.slug?.current === product.slug?.current) {
          cartProduct.quantity! += quantity!;
          this.cart.totalPrice! += cartProduct.price! * quantity;
          this.cart.totalQuantities! += quantity;
        }
      });
    } else {
      //console.log('assente');
      product.quantity = quantity;
      this.cart.cartItems?.push(product);
      this.cart.totalPrice! += product.price! * quantity;
      this.cart.totalQuantities! += quantity;
    }
    this.cartItemCountSubject.next(this.cart.totalQuantities!);
    console.log(quantity + ' ' + product.name + ' added to Cart.');
    console.log(this.cart);
  }
  onRemoveItems(product: Product): void {
    const checkProductInCart = this.cart.cartItems!.find(
      (item) => item.slug?.current === product.slug?.current
    );
    if (checkProductInCart) {
      const newCartItems: Product[] = this.cart.cartItems!.filter(
        (item) => item.slug !== product.slug
      );
      this.cart.cartItems = newCartItems;
      this.cart.totalPrice! -=
        checkProductInCart.price! * checkProductInCart.quantity!;
      this.cart.totalQuantities! -= checkProductInCart.quantity!;
      this.cartItemCountSubject.next(this.cart.totalQuantities!);
    }
  }
  onUpdateQty(product: Product) {
    const updatecartItems = this.cart.cartItems!.map((cartProduct) => {
      if (cartProduct.slug?.current === product.slug?.current) {
        if (cartProduct.quantity === 1) {
          //this.onRemoveItems(product);
          return;
        } else {
          cartProduct.quantity! -= 1;
          this.cart.totalPrice! -= product.price!;
          this.cart.totalQuantities! -= 1;
        }
        this.cartItemCountSubject.next(this.cart.totalQuantities!);
      }
    });
  }
  getCartItems(): Cart {
    return this.cart;
  }
}
