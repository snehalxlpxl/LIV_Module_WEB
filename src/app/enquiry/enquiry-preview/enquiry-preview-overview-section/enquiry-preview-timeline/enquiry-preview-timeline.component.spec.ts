import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryPreviewTimelineComponent } from './enquiry-preview-timeline.component';

describe('EnquiryPreviewTimelineComponent', () => {
  let component: EnquiryPreviewTimelineComponent;
  let fixture: ComponentFixture<EnquiryPreviewTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryPreviewTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryPreviewTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
