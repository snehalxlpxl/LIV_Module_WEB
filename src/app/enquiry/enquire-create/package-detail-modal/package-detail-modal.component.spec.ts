import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDetailModalComponent } from './package-detail-modal.component';

describe('PackageDetailModalComponent', () => {
  let component: PackageDetailModalComponent;
  let fixture: ComponentFixture<PackageDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageDetailModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
