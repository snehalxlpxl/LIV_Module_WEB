import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLimitRequestModalComponent } from './credit-limit-request-modal.component';

describe('CreditLimitRequestModalComponent', () => {
  let component: CreditLimitRequestModalComponent;
  let fixture: ComponentFixture<CreditLimitRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditLimitRequestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditLimitRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
