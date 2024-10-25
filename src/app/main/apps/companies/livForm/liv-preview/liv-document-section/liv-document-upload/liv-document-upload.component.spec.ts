import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivDocumentUploadComponent } from './liv-document-upload.component';

describe('LivDocumentUploadComponent', () => {
  let component: LivDocumentUploadComponent;
  let fixture: ComponentFixture<LivDocumentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivDocumentUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivDocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
