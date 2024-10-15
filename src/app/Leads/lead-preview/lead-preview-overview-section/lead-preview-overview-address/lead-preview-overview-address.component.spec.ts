import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPreviewOverviewAddressComponent } from './lead-preview-overview-address.component';

describe('LeadPreviewOverviewAddressComponent', () => {
  let component: LeadPreviewOverviewAddressComponent;
  let fixture: ComponentFixture<LeadPreviewOverviewAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadPreviewOverviewAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadPreviewOverviewAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
