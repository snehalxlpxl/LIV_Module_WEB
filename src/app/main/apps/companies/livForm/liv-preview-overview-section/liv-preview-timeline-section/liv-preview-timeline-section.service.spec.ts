import { TestBed } from '@angular/core/testing';

import { LivPreviewTimelineSectionService } from './liv-preview-timeline-section.service';

describe('LivPreviewTimelineSectionService', () => {
  let service: LivPreviewTimelineSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivPreviewTimelineSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
