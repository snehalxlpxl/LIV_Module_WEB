import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRateRequestModalComponent } from './new-rate-request-modal.component';

describe('NewRateRequestModalComponent', () => {
  let component: NewRateRequestModalComponent;
  let fixture: ComponentFixture<NewRateRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRateRequestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRateRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
