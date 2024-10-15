import { TestBed } from '@angular/core/testing';

import { CustPreviewTrasacServiceService } from './cust-preview-trasac-service.service';

describe('CustPreviewTrasacServiceService', () => {
  let service: CustPreviewTrasacServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustPreviewTrasacServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
