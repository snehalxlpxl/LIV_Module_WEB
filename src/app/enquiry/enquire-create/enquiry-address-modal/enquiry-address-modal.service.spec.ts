import { TestBed } from '@angular/core/testing';

import { EnquiryAddressModalService } from './enquiry-address-modal.service';

describe('EnquiryAddressModalService', () => {
  let service: EnquiryAddressModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquiryAddressModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
