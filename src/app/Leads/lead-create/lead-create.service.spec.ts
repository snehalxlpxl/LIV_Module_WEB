import { TestBed } from '@angular/core/testing';

import { LeadCreateService } from './lead-create.service';

describe('LeadCreateService', () => {
  let service: LeadCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
