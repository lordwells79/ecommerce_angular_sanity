import { Injectable } from '@angular/core';
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';
import { environment } from '../../environments/environment';

export interface Banner {
  buttonText?: string;
  desc?: string;
  discount?: string;
  image?: any;
  largeText1?: string;
  largeText2?: string;
  midText?: string;
  product?: string;
  saleTime?: string;
  smallText?: string;
  _type?: string;
}
export interface Slug {
  current: string;
  _type: string;
}
export interface Product {
  details?: string;
  image?: any;
  name?: string;
  price?: number;
  slug?: Slug;
  quantity?: number;
}
const bannerQuery = '*[_type == "banner"]';
const productsQuery = '*[_type == "product"]';

@Injectable({
  providedIn: 'root',
})
export class SanityServiceService {
  constructor() {}

  sanityClientCredentials = {
    option: createClient({
      projectId: environment.SANITY_PROJECT_ID,
      dataset: environment.SANITY_DATASET,
      apiVersion: environment.SANITY_API_VERSION,
      useCdn: true,
    }),
  };
  urlFor = (source: any) =>
    imageUrlBuilder(this.sanityClientCredentials.option).image(source);

  async getBanner(): Promise<Banner[]> {
    return await this.sanityClientCredentials.option.fetch(bannerQuery);
  }
  async getProducts(): Promise<Product[]> {
    return await this.sanityClientCredentials.option.fetch(productsQuery);
  }
  async getProductbySlug(slug: string): Promise<Product> {
    const slugQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
    return await this.sanityClientCredentials.option.fetch(slugQuery, { slug });
  }
}
