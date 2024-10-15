import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPreviewOverviewTotalSalesProfitComponent } from './customer-preview-overview-total-sales-profit.component';

describe('CustomerPreviewOverviewTotalSalesProfitComponent', () => {
  let component: CustomerPreviewOverviewTotalSalesProfitComponent;
  let fixture: ComponentFixture<CustomerPreviewOverviewTotalSalesProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPreviewOverviewTotalSalesProfitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPreviewOverviewTotalSalesProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
