import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPreviewOverviewTimelineComponent } from './lead-preview-overview-timeline.component';

describe('LeadPreviewOverviewTimelineComponent', () => {
  let component: LeadPreviewOverviewTimelineComponent;
  let fixture: ComponentFixture<LeadPreviewOverviewTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadPreviewOverviewTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadPreviewOverviewTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
