import { TestBed } from '@angular/core/testing';

import { EnquireCreateService } from './enquire-create.service';

describe('EnquireCreateService', () => {
  let service: EnquireCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquireCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
