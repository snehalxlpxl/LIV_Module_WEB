import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPreviewOverviewBasicDetailComponent } from './customer-preview-overview-basic-detail.component';

describe('CustomerPreviewOverviewBasicDetailComponent', () => {
  let component: CustomerPreviewOverviewBasicDetailComponent;
  let fixture: ComponentFixture<CustomerPreviewOverviewBasicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPreviewOverviewBasicDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPreviewOverviewBasicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
