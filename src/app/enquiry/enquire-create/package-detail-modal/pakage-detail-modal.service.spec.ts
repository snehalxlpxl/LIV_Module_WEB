import { TestBed } from '@angular/core/testing';

import { PakageDetailModalService } from './pakage-detail-modal.service';

describe('PakageDetailModalService', () => {
  let service: PakageDetailModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PakageDetailModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
