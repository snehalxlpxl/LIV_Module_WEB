import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivPreviewComponent } from './liv-preview.component';

describe('LivPreviewComponent', () => {
  let component: LivPreviewComponent;
  let fixture: ComponentFixture<LivPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
