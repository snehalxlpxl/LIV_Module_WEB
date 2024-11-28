import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectmsgpageComponent } from './rejectmsgpage.component';

describe('RejectmsgpageComponent', () => {
  let component: RejectmsgpageComponent;
  let fixture: ComponentFixture<RejectmsgpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectmsgpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectmsgpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
