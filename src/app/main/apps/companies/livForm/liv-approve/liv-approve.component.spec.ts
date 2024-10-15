import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivApproveComponent } from './liv-approve.component';

describe('LivApproveComponent', () => {
  let component: LivApproveComponent;
  let fixture: ComponentFixture<LivApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
