import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LivApproveService } from '../../liv-approve/liv-approve.service';
import { ActivatedRoute } from '@angular/router';
import { LivPreviewService } from '../liv-preview.service';
declare var bootstrap: any;

@Component({
  selector: 'app-reject-modal',
  templateUrl: './reject-modal.component.html',
  styleUrls: ['./reject-modal.component.scss']
})
export class RejectModalComponent implements OnInit {
  @Input() LIVRequestId: any; 
  livRequest: any;
  userName: any;
  userId: any;

  constructor(public activeModal: NgbActiveModal,private livApproveService:LivApproveService,private route: ActivatedRoute,private livRequestService: LivPreviewService,) { }

  ngOnInit(): void {
    console.log("BasicDetailLIVRequestId",this.LIVRequestId);
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
  } else {
      console.log('No user data found in sessionStorage');
  }
  }
  confirmRejection() {
    const rejectionReason = (document.getElementById('rejectionReason') as HTMLInputElement).value;
    
    if (rejectionReason) {
      // Assuming 'Rejected' is the status you want to send
      const status = 'Rejected';
      
      // Call the updateApprovalTask service method
      this.livApproveService.updateApprovalTask(this.LIVRequestId, status, rejectionReason, this.userId).subscribe(
        response => {
          console.log('Approval task updated successfully:', response);
          // Close the modal after confirming rejection
          this.closeModal();
          this.close();
          window.location.reload();
        },
        error => {
          console.error('Error updating approval task:', error);
          alert('There was an error processing your request. Please try again.');
        }
      );
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
