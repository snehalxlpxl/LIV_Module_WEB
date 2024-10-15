import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPreviewOverviewTimelineComponent } from './customer-preview-overview-timeline.component';

describe('CustomerPreviewOverviewTimelineComponent', () => {
  let component: CustomerPreviewOverviewTimelineComponent;
  let fixture: ComponentFixture<CustomerPreviewOverviewTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPreviewOverviewTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPreviewOverviewTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
