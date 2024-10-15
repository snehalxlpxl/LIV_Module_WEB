import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPreviewOverviewSectionComponent } from './lead-preview-overview-section.component';

describe('LeadPreviewOverviewSectionComponent', () => {
  let component: LeadPreviewOverviewSectionComponent;
  let fixture: ComponentFixture<LeadPreviewOverviewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadPreviewOverviewSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadPreviewOverviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
