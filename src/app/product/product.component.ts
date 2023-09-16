import { Component } from '@angular/core';
import { Product, SanityServiceService } from '../sanity-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  constructor(private sanityService: SanityServiceService) {}
  products: Product[] = [];

  defaultImageURL = '';

  imageUrl(source: any) {
    return source ? this.sanityService.urlFor(source) : this.defaultImageURL;
  }
  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts(): Promise<Product[]> {
    this.products = await this.sanityService.getProducts();
    // console.log(this.products[0]);
    return this.products;
  }
}
