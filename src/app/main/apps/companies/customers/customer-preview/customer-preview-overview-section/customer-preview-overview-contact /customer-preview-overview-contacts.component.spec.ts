import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPreviewOverviewContactsComponent } from './customer-preview-overview-contacts.component';

describe('CustomerPreviewOverviewContactsComponent', () => {
  let component: CustomerPreviewOverviewContactsComponent;
  let fixture: ComponentFixture<CustomerPreviewOverviewContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPreviewOverviewContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPreviewOverviewContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
