import { TestBed } from '@angular/core/testing';

import { TaxDetailsService } from './tax-details.service';

describe('TaxDetailsService', () => {
  let service: TaxDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
