import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivPreviewOverviewSectionComponent } from './liv-preview-overview-section.component';

describe('LivPreviewOverviewSectionComponent', () => {
  let component: LivPreviewOverviewSectionComponent;
  let fixture: ComponentFixture<LivPreviewOverviewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivPreviewOverviewSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivPreviewOverviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
