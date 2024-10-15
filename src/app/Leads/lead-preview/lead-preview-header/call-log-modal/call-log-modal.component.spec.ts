import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogModalComponent } from './call-log-modal.component';

describe('CallLogModalComponent', () => {
  let component: CallLogModalComponent;
  let fixture: ComponentFixture<CallLogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallLogModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallLogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
