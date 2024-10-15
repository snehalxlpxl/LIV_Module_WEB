import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivPreviewTimeLineSectionComponent } from './liv-preview-time-line-section.component';

describe('LivPreviewTimeLineSectionComponent', () => {
  let component: LivPreviewTimeLineSectionComponent;
  let fixture: ComponentFixture<LivPreviewTimeLineSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivPreviewTimeLineSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivPreviewTimeLineSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
