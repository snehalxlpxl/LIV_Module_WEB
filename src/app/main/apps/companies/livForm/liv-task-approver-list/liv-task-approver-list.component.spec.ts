import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivTaskApproverListComponent } from './liv-task-approver-list.component';

describe('LivTaskApproverListComponent', () => {
  let component: LivTaskApproverListComponent;
  let fixture: ComponentFixture<LivTaskApproverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivTaskApproverListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivTaskApproverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
