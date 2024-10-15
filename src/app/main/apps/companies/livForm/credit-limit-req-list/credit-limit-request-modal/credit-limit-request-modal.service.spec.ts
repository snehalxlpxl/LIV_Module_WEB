import { TestBed } from '@angular/core/testing';

import { CreditLimitRequestModalService } from './credit-limit-request-modal.service';

describe('CreditLimitRequestModalService', () => {
  let service: CreditLimitRequestModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditLimitRequestModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
