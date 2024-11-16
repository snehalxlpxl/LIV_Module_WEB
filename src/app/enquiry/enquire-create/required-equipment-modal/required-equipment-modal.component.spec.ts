import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredEquipmentModalComponent } from './required-equipment-modal.component';

describe('RequiredEquipmentModalComponent', () => {
  let component: RequiredEquipmentModalComponent;
  let fixture: ComponentFixture<RequiredEquipmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredEquipmentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredEquipmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
