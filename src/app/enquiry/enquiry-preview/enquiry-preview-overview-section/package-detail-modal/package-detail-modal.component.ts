import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-package-detail-modal',
  templateUrl: './package-detail-modal.component.html',
  styleUrls: ['./package-detail-modal.component.scss']
})
export class PackageDetailModalComponent implements OnInit {
  // @Output() closeModal = new EventEmitter<void>();
  @Output() packageDetailsAdded = new EventEmitter<void>();

  // Define properties for form data binding
  packageType: string = 'Boxes';
  grossWeight: number = 540; // Default example value
  packageCount: number;
  length: number;
  width: number;
  height: number;
  netWeight: number;
  grossWeightDetails: number;
  volumeWeight: number;
  cbm: number;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void { }


  addPackageDetails() {
    // Handle package details submission logic
    this.packageDetailsAdded.emit();
  }
  closeModal(): void {
    this.activeModal.dismiss('Modal dismissed');
  }
}
