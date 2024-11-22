import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRateRequestRevisionModalComponent } from './open-rate-request-revision-modal.component';

describe('OpenRateRequestRevisionModalComponent', () => {
  let component: OpenRateRequestRevisionModalComponent;
  let fixture: ComponentFixture<OpenRateRequestRevisionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenRateRequestRevisionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenRateRequestRevisionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
