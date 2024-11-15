import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryPreviewAddressComponent } from './enquiry-preview-address.component';

describe('EnquiryPreviewAddressComponent', () => {
  let component: EnquiryPreviewAddressComponent;
  let fixture: ComponentFixture<EnquiryPreviewAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryPreviewAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryPreviewAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
