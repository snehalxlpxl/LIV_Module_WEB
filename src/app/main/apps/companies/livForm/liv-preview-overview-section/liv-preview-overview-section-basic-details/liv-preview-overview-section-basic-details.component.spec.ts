import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivPreviewOverviewSectionBasicDetailsComponent } from './liv-preview-overview-section-basic-details.component';

describe('LivPreviewOverviewSectionBasicDetailsComponent', () => {
  let component: LivPreviewOverviewSectionBasicDetailsComponent;
  let fixture: ComponentFixture<LivPreviewOverviewSectionBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivPreviewOverviewSectionBasicDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivPreviewOverviewSectionBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
