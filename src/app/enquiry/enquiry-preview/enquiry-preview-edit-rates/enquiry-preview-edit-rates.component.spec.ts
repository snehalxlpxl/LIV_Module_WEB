import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryPreviewEditRatesComponent } from './enquiry-preview-edit-rates.component';

describe('EnquiryPreviewEditRatesComponent', () => {
  let component: EnquiryPreviewEditRatesComponent;
  let fixture: ComponentFixture<EnquiryPreviewEditRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryPreviewEditRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryPreviewEditRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
