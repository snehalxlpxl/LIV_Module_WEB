import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPreviewHeaderComponent } from './lead-preview-header.component';

describe('LeadPreviewHeaderComponent', () => {
  let component: LeadPreviewHeaderComponent;
  let fixture: ComponentFixture<LeadPreviewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadPreviewHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadPreviewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
