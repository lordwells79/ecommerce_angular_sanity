import { Component } from '@angular/core';
import { Banner, SanityServiceService } from '../sanity-service.service';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css'],
})
export class HeroBannerComponent {
  constructor(private sanityService: SanityServiceService) {}

  heroBanner: Banner = {};

  defaultImageURL = '';

  imageUrl(source: any) {
    return source ? this.sanityService.urlFor(source) : this.defaultImageURL;
  }
  ngOnInit(): void {
    this.getBanners();
  }
  async getBanners(): Promise<Banner> {
    const ar = await this.sanityService.getBanner();
    this.heroBanner = ar[0];
    //console.log(this.heroBanner);
    return this.heroBanner;
  }
}
