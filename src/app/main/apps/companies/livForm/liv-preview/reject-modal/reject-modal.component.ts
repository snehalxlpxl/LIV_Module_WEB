import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var bootstrap: any;

@Component({
  selector: 'app-reject-modal',
  templateUrl: './reject-modal.component.html',
  styleUrls: ['./reject-modal.component.scss']
})
export class RejectModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  confirmRejection() {
    const rejectionReason = (document.getElementById('rejectionReason') as HTMLInputElement).value;
    if (rejectionReason) {
      // Handle rejection confirmation logic
      console.log('Rejection Reason:', rejectionReason);
      // Close the modal after confirming rejection
      this.closeModal();
    } else {
      alert('Please enter a reason for rejection.');
    }
  }

  closeModal() {
    const modalElement = document.getElementById('rejectModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
  close(): void {
    this.activeModal.dismiss('Modal dismissed');
  }

}
