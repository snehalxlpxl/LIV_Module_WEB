import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPreviewOverviewSectionComponent } from './customer-preview-overview-section.component';

describe('CustomerPreviewOverviewSectionComponent', () => {
  let component: CustomerPreviewOverviewSectionComponent;
  let fixture: ComponentFixture<CustomerPreviewOverviewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPreviewOverviewSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPreviewOverviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
