import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPreviewOverviewAddressComponent } from './customer-preview-overview-address.component';

describe('CustomerPreviewOverviewAddressComponent', () => {
  let component: CustomerPreviewOverviewAddressComponent;
  let fixture: ComponentFixture<CustomerPreviewOverviewAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPreviewOverviewAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPreviewOverviewAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
