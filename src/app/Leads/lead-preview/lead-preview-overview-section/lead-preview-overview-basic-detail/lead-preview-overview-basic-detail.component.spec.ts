import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPreviewOverviewBasicDetailComponent } from './lead-preview-overview-basic-detail.component';

describe('LeadPreviewOverviewBasicDetailComponent', () => {
  let component: LeadPreviewOverviewBasicDetailComponent;
  let fixture: ComponentFixture<LeadPreviewOverviewBasicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadPreviewOverviewBasicDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadPreviewOverviewBasicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
