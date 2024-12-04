import { TestBed } from '@angular/core/testing';

import { CustomerEnquiryListSectionService } from './customer-enquiry-list-section.service';

describe('CustomerEnquiryListSectionService', () => {
  let service: CustomerEnquiryListSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerEnquiryListSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
