import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivPreviewDocumentsSectionComponent } from './liv-preview-documents-section.component';

describe('LivPreviewDocumentsSectionComponent', () => {
  let component: LivPreviewDocumentsSectionComponent;
  let fixture: ComponentFixture<LivPreviewDocumentsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivPreviewDocumentsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivPreviewDocumentsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
