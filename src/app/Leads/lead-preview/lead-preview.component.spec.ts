import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPreviewComponent } from './lead-preview.component';

describe('LeadPreviewComponent', () => {
  let component: LeadPreviewComponent;
  let fixture: ComponentFixture<LeadPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
