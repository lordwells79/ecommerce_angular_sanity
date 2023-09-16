import { Component } from '@angular/core';
import { Banner, SanityServiceService } from '../sanity-service.service';

@Component({
  selector: 'app-footer-banner',
  templateUrl: './footer-banner.component.html',
  styleUrls: ['./footer-banner.component.css'],
})
export class FooterBannerComponent {
  constructor(private sanityService: SanityServiceService) {}
  footerBanner: Banner = {};

  defaultImageURL = '';

  imageUrl(source: any) {
    return source ? this.sanityService.urlFor(source) : this.defaultImageURL;
  }
  ngOnInit(): void {
    this.getBanners();
  }
  async getBanners(): Promise<Banner> {
    const ar = await this.sanityService.getBanner();
    this.footerBanner = ar[0];
    //console.log(this.footerBanner);
    return this.footerBanner;
  }
}
