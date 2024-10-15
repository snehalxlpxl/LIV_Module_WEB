import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPreviewOverviewAdditionaldetailsComponent } from './lead-preview-overview-additionaldetails.component';

describe('LeadPreviewOverviewAdditionaldetailsComponent', () => {
  let component: LeadPreviewOverviewAdditionaldetailsComponent;
  let fixture: ComponentFixture<LeadPreviewOverviewAdditionaldetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadPreviewOverviewAdditionaldetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadPreviewOverviewAdditionaldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
