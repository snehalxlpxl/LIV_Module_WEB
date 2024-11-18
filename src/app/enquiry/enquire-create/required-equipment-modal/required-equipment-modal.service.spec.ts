import { TestBed } from '@angular/core/testing';

import { RequiredEquipmentModalService } from './required-equipment-modal.service';

describe('RequiredEquipmentModalService', () => {
  let service: RequiredEquipmentModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequiredEquipmentModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
