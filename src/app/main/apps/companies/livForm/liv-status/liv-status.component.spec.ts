import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivStatusComponent } from './liv-status.component';

describe('LivStatusComponent', () => {
  let component: LivStatusComponent;
  let fixture: ComponentFixture<LivStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
