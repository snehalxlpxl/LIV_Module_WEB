import { TestBed } from '@angular/core/testing';

import { LeadsListService } from './leads-list.service';

describe('LeadsListService', () => {
  let service: LeadsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
