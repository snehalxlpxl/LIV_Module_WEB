import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryPreviewBasicDetailComponent } from './enquiry-preview-basic-detail.component';

describe('EnquiryPreviewBasicDetailComponent', () => {
  let component: EnquiryPreviewBasicDetailComponent;
  let fixture: ComponentFixture<EnquiryPreviewBasicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryPreviewBasicDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryPreviewBasicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
