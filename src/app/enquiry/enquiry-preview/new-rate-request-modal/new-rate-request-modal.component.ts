import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-rate-request-modal',
  templateUrl: './new-rate-request-modal.component.html',
  styleUrls: ['./new-rate-request-modal.component.scss']
})
export class NewRateRequestModalComponent implements OnInit {
  selectedAgent: string | null = null;
  sendTo: string = '';
  cc: string = '';
  draftContent: string = '';
  agentOptions: string[] = ['Maersk', 'CMA CGM', 'Hapag-Lloyd', 'ONE', 'Evergreen'];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  closeModal(): void {
    this.activeModal.dismiss('Modal dismissed');
  }
  sendRateRequest(): void {
    Swal.fire({
      title: 'Confirm Sending Rate Request',
      text: 'Are you sure you want to send this rate request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, send it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const rateRequestData = {
          agent: this.selectedAgent,
          sendTo: this.sendTo,
          cc: this.cc,
          draft: this.draftContent,
        };

        console.log('Rate Request Data:', rateRequestData);

        // Simulate sending API request
        setTimeout(() => {
          this.activeModal.close(rateRequestData);
          Swal.fire('Sent!', 'Your rate request has been sent successfully.', 'success');
        }, 1000);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Rate request was not sent.', 'error');
      }
    });
  }
}
