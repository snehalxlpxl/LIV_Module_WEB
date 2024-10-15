import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivPreviewTimelineSectionComponent } from './liv-preview-timeline-section.component';

describe('LivPreviewTimelineSectionComponent', () => {
  let component: LivPreviewTimelineSectionComponent;
  let fixture: ComponentFixture<LivPreviewTimelineSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivPreviewTimelineSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivPreviewTimelineSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
