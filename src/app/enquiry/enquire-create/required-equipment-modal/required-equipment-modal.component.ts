import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-required-equipment-modal',
  templateUrl: './required-equipment-modal.component.html',
  styleUrls: ['./required-equipment-modal.component.scss']
})
export class RequiredEquipmentModalComponent implements OnInit {
 containerType: string = '40GP';
containerCount: number = 1;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.activeModal.dismiss('Modal dismissed');
  }
  addRequiredEquipment() {
    // Implement the logic for handling required equipment submission
    // For example, close the modal and pass data to the parent component
   
  }
}
