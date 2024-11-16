import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryAddressModalComponent } from './enquiry-address-modal.component';

describe('EnquiryAddressModalComponent', () => {
  let component: EnquiryAddressModalComponent;
  let fixture: ComponentFixture<EnquiryAddressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryAddressModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
