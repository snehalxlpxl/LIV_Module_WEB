import { TestBed } from '@angular/core/testing';

import { EnquiryPreviewEditRatesService } from './enquiry-preview-edit-rates.service';

describe('EnquiryPreviewEditRatesService', () => {
  let service: EnquiryPreviewEditRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquiryPreviewEditRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
