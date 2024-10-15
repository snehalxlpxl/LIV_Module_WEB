import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPreviewHeaderComponent } from './customer-preview-header.component';

describe('CustomerPreviewHeaderComponent', () => {
  let component: CustomerPreviewHeaderComponent;
  let fixture: ComponentFixture<CustomerPreviewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPreviewHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPreviewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
