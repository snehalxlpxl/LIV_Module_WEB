import { TestBed } from '@angular/core/testing';

import { CustomerPreviewShipmentService } from './customer-preview-shipment.service';

describe('CustomerPreviewShipmentService', () => {
  let service: CustomerPreviewShipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerPreviewShipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
