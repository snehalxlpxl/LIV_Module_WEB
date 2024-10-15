import { TestBed } from '@angular/core/testing';

import { AddContactDetailService } from './add-contact-detail.service';

describe('AddContactDetailService', () => {
  let service: AddContactDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddContactDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
