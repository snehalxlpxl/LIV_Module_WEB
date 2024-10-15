import { TestBed } from '@angular/core/testing';

import { LivApproveService } from './liv-approve.service';

describe('LivApproveService', () => {
  let service: LivApproveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivApproveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
