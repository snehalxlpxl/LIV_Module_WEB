import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovemsgpageComponent } from './approvemsgpage.component';

describe('ApprovemsgpageComponent', () => {
  let component: ApprovemsgpageComponent;
  let fixture: ComponentFixture<ApprovemsgpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovemsgpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovemsgpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
