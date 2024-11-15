import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquireCreateComponent } from './enquire-create.component';

describe('EnquireCreateComponent', () => {
  let component: EnquireCreateComponent;
  let fixture: ComponentFixture<EnquireCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquireCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquireCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
