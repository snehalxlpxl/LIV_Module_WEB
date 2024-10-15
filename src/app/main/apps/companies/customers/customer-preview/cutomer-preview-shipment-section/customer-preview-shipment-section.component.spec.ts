import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPreviewShipmentSectionComponent } from './customer-preview-shipment-section.component';

describe('CustomerPreviewShipmentSectionComponent', () => {
  let component: CustomerPreviewShipmentSectionComponent;
  let fixture: ComponentFixture<CustomerPreviewShipmentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPreviewShipmentSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPreviewShipmentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
