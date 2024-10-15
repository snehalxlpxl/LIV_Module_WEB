import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivOverviewSectionSummaryComponent } from './liv-overview-section-summary.component';

describe('LivOverviewSectionSummaryComponent', () => {
  let component: LivOverviewSectionSummaryComponent;
  let fixture: ComponentFixture<LivOverviewSectionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivOverviewSectionSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivOverviewSectionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
