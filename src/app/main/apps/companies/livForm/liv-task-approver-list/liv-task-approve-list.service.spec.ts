import { TestBed } from '@angular/core/testing';

import { LivTaskApproveListService } from './liv-task-approve-list.service';

describe('LivTaskApproveListService', () => {
  let service: LivTaskApproveListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivTaskApproveListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
