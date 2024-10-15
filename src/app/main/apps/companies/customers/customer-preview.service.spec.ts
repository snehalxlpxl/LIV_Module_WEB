import { TestBed } from '@angular/core/testing';

import { CustomerPreviewService } from './customer-preview.service';

describe('CustomerPreviewService', () => {
  let service: CustomerPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
