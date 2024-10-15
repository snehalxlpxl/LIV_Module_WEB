import { TestBed } from '@angular/core/testing';

import { CreditLimitReqListService } from './credit-limit-req-list.service';

describe('CreditLimitReqListService', () => {
  let service: CreditLimitReqListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditLimitReqListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
