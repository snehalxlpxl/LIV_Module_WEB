import { TestBed } from '@angular/core/testing';

import { EnquiryListService } from './enquiry-list.service';

describe('EnquiryListService', () => {
  let service: EnquiryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquiryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
