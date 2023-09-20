import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StripeModule } from 'stripe-angular';
import { NgxPayPalModule } from 'ngx-paypal';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { FooterBannerComponent } from './footer-banner/footer-banner.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HttpClientModule } from '@angular/common/http';
import { SuccessComponent } from './success/success.component';
import { PayPalButtonComponent } from './pay-pal-button/pay-pal-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroBannerComponent,
    FooterComponent,
    ProductComponent,
    FooterBannerComponent,
    NavBarComponent,
    ProductDetailsComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    SuccessComponent,
    PayPalButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxPayPalModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }), // ToastrModule added
    StripeModule.forRoot(''),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
