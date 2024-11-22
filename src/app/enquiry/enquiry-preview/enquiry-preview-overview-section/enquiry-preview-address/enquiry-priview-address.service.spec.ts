import { TestBed } from '@angular/core/testing';

import { EnquiryPriviewAddressService } from './enquiry-priview-address.service';

describe('EnquiryPriviewAddressService', () => {
  let service: EnquiryPriviewAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquiryPriviewAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
