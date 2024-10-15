import { TestBed } from '@angular/core/testing';

import { LeadPreviewService } from './lead-preview.service';

describe('LeadPreviewService', () => {
  let service: LeadPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
