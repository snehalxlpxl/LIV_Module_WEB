import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustGstDetailsComponent } from './add-cust-gst-details.component';

describe('AddCustGstDetailsComponent', () => {
  let component: AddCustGstDetailsComponent;
  let fixture: ComponentFixture<AddCustGstDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustGstDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustGstDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
