import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivDocumentSectionComponent } from './liv-document-section.component';

describe('LivDocumentSectionComponent', () => {
  let component: LivDocumentSectionComponent;
  let fixture: ComponentFixture<LivDocumentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivDocumentSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivDocumentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
