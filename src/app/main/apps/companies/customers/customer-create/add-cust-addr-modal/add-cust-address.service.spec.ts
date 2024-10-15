import { TestBed } from '@angular/core/testing';

import { AddCustAddressService } from './add-cust-address.service';

describe('AddCustAddressService', () => {
  let service: AddCustAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCustAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
