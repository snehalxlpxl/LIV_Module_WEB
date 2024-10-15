import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPlusComponent } from './navbar-plus.component';

describe('NavbarPlusComponent', () => {
  let component: NavbarPlusComponent;
  let fixture: ComponentFixture<NavbarPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarPlusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
