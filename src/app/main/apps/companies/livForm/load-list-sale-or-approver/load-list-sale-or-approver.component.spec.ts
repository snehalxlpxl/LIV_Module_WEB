import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadListSaleOrApproverComponent } from './load-list-sale-or-approver.component';

describe('LoadListSaleOrApproverComponent', () => {
  let component: LoadListSaleOrApproverComponent;
  let fixture: ComponentFixture<LoadListSaleOrApproverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadListSaleOrApproverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadListSaleOrApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
