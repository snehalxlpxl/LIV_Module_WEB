import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPreviewEnquiryListSectionComponent } from './lead-preview-enquiry-list-section.component';

describe('LeadPreviewEnquiryListSectionComponent', () => {
  let component: LeadPreviewEnquiryListSectionComponent;
  let fixture: ComponentFixture<LeadPreviewEnquiryListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadPreviewEnquiryListSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadPreviewEnquiryListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
