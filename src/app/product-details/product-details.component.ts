import { Component } from '@angular/core';
import { Product, SanityServiceService } from '../sanity-service.service';
import { ContextService } from '../context.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  constructor(
    private sanityService: SanityServiceService,
    private contextService: ContextService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  //slug: any;
  product: Product = {
    details: '',
    image: '',
    name: '',
    price: 0,
    slug: {
      current: '',
      _type: '',
    },
    quantity: 1,
  };
  faStar = faStar;
  qty: number = 1;
  index: number = 0;

  ngOnInit(): void {
    //this.slug = this.route.snapshot.paramMap.get('slug');
    //console.log(this.slug);
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug !== null) {
        this.getProduct(slug);
      }
    });
  }

  defaultImageURL = '';

  imageUrl(source: any) {
    return source ? this.sanityService.urlFor(source) : this.defaultImageURL;
  }
  async getProduct(slug: string): Promise<Product> {
    this.product = await this.sanityService.getProductbySlug(slug);
    //console.log(this.product);
    return this.product;
  }
  setShowCart(val: any) {
    this.contextService.setShowCart(val);
    console.log('buynow');
  }
  addToCart(product: Product, quantity: number) {
    this.contextService.onAdd(product, quantity);
  }
  incQty(): void {
    this.qty++;
  }
  decQty(): void {
    if (this.qty - 1 < 1) {
      this.qty = 1;
    } else {
      this.qty--;
    }
  }
  goBack(): void {
    this.location.back();
  }
  setIndex(index: number) {
    this.index = index;
  }
  handleBuyNow(product: Product, qty: number) {
    this.contextService.onAdd(product, qty);
    this.contextService.setShowCart(true);
  }
}
