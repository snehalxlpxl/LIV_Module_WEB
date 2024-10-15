import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPreviewActivitiesSectionComponent } from './lead-preview-activities-section.component';

describe('LeadPreviewActivitiesSectionComponent', () => {
  let component: LeadPreviewActivitiesSectionComponent;
  let fixture: ComponentFixture<LeadPreviewActivitiesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadPreviewActivitiesSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadPreviewActivitiesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
