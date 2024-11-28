import { TestBed } from '@angular/core/testing';

import { EnquiryPreviewEnquiryService } from './enquiry-preview-enquiry.service';

describe('EnquiryPreviewEnquiryService', () => {
  let service: EnquiryPreviewEnquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquiryPreviewEnquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
