import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryPreviewOverviewSectionComponent } from './enquiry-preview-overview-section.component';

describe('EnquiryPreviewOverviewSectionComponent', () => {
  let component: EnquiryPreviewOverviewSectionComponent;
  let fixture: ComponentFixture<EnquiryPreviewOverviewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryPreviewOverviewSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryPreviewOverviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
