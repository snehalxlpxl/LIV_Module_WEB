import { TestBed } from '@angular/core/testing';

import { LeadPreviewEnquiryListSectionService } from './lead-preview-enquiry-list-section.service';

describe('LeadPreviewEnquiryListSectionService', () => {
  let service: LeadPreviewEnquiryListSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadPreviewEnquiryListSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
