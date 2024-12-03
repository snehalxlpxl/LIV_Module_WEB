import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEnquiryListSectionComponent } from './customer-enquiry-list-section.component';

describe('CustomerEnquiryListSectionComponent', () => {
  let component: CustomerEnquiryListSectionComponent;
  let fixture: ComponentFixture<CustomerEnquiryListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEnquiryListSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerEnquiryListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
