import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPreviewOverviewProductsComponent } from './lead-preview-overview-products.component';

describe('LeadPreviewOverviewProductsComponent', () => {
  let component: LeadPreviewOverviewProductsComponent;
  let fixture: ComponentFixture<LeadPreviewOverviewProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadPreviewOverviewProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadPreviewOverviewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
