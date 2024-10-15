import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingInformationModalComponent } from './meeting-information-modal.component';

describe('MeetingInformationModalComponent', () => {
  let component: MeetingInformationModalComponent;
  let fixture: ComponentFixture<MeetingInformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingInformationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
