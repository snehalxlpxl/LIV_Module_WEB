import { TestBed } from '@angular/core/testing';

import { LoadListSaleOrApproverService } from './load-list-sale-or-approver.service';

describe('LoadListSaleOrApproverService', () => {
  let service: LoadListSaleOrApproverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadListSaleOrApproverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
