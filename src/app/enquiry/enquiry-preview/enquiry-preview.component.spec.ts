import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryPreviewComponent } from './enquiry-preview.component';

describe('EnquiryPreviewComponent', () => {
  let component: EnquiryPreviewComponent;
  let fixture: ComponentFixture<EnquiryPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
