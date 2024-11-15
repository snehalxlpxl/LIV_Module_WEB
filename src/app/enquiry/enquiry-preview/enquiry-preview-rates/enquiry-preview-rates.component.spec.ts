import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryPreviewRatesComponent } from './enquiry-preview-rates.component';

describe('EnquiryPreviewRatesComponent', () => {
  let component: EnquiryPreviewRatesComponent;
  let fixture: ComponentFixture<EnquiryPreviewRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryPreviewRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryPreviewRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
