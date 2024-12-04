import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidmsgpageComponent } from './invalidmsgpage.component';

describe('InvalidmsgpageComponent', () => {
  let component: InvalidmsgpageComponent;
  let fixture: ComponentFixture<InvalidmsgpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidmsgpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidmsgpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
