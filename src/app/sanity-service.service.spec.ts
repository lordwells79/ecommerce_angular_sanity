import { TestBed } from '@angular/core/testing';

import { SanityServiceService } from './sanity-service.service';

describe('SanityServiceService', () => {
  let service: SanityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
