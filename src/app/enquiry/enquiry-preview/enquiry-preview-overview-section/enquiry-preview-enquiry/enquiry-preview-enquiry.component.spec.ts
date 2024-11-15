import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryPreviewEnquiryComponent } from './enquiry-preview-enquiry.component';

describe('EnquiryPreviewEnquiryComponent', () => {
  let component: EnquiryPreviewEnquiryComponent;
  let fixture: ComponentFixture<EnquiryPreviewEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryPreviewEnquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryPreviewEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
