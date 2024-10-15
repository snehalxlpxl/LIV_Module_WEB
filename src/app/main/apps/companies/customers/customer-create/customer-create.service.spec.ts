import { TestBed } from '@angular/core/testing';

import { CustomerCreateService } from './customer-create.service';

describe('CustomerCreateService', () => {
  let service: CustomerCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
