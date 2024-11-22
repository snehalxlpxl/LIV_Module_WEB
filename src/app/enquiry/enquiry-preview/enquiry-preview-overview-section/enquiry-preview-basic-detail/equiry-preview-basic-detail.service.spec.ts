import { TestBed } from '@angular/core/testing';

import { EquiryPreviewBasicDetailService } from './equiry-preview-basic-detail.service';

describe('EquiryPreviewBasicDetailService', () => {
  let service: EquiryPreviewBasicDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquiryPreviewBasicDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
