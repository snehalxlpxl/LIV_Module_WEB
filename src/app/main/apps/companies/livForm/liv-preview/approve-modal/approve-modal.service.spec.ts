import { TestBed } from '@angular/core/testing';

import { ApproveModalService } from './approve-modal.service';

describe('ApproveModalService', () => {
  let service: ApproveModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
