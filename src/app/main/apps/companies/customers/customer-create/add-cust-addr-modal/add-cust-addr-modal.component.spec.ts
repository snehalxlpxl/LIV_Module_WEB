import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustAddrModalComponent } from './add-cust-addr-modal.component';

describe('AddCustAddrModalComponent', () => {
  let component: AddCustAddrModalComponent;
  let fixture: ComponentFixture<AddCustAddrModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustAddrModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustAddrModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
