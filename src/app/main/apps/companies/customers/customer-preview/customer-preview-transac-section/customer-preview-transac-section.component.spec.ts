import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPreviewTransacSectionComponent } from './customer-preview-transac-section.component';

describe('CustomerPreviewTransacSectionComponent', () => {
  let component: CustomerPreviewTransacSectionComponent;
  let fixture: ComponentFixture<CustomerPreviewTransacSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPreviewTransacSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPreviewTransacSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
