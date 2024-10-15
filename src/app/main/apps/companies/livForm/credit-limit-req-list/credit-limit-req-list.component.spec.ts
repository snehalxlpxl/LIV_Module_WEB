import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLimitReqListComponent } from './credit-limit-req-list.component';

describe('CreditLimitReqListComponent', () => {
  let component: CreditLimitReqListComponent;
  let fixture: ComponentFixture<CreditLimitReqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditLimitReqListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditLimitReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
