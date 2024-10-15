import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustContactModalComponent } from './add-cust-contact-modal.component';

describe('AddCustContactModalComponent', () => {
  let component: AddCustContactModalComponent;
  let fixture: ComponentFixture<AddCustContactModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustContactModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
