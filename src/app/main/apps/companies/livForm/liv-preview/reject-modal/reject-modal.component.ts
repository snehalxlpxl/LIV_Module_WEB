import { Component, OnInit,Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LivApproveService } from '../../liv-approve/liv-approve.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LivPreviewService } from '../liv-preview.service';
import { CreditLimitReqListService } from '../../credit-limit-req-list/credit-limit-req-list.service';
import { ActivityNotificationService } from 'app/Leads/lead-preview/lead-preview-activities-section/ActivityNotificationService.service';
declare var bootstrap: any;

@Component({
  selector: 'app-reject-modal',
  templateUrl: './reject-modal.component.html',
  styleUrls: ['./reject-modal.component.scss']
})
export class RejectModalComponent implements OnInit {
  isSubmitted = false;
  @Output() rejectConfirmed = new EventEmitter<boolean>();

  @Input() LIVRequestId: any; 
  livRequest: any;
  userName: any;
  userId: any;

  constructor(public activeModal: NgbActiveModal,private router: Router,private livApproveService:LivApproveService,private route: ActivatedRoute,private livRequestService: LivPreviewService,private CreditLimitReqListSer:CreditLimitReqListService, private activityNotificationService: ActivityNotificationService
    ,  private cdr: ChangeDetectorRef
  ) { }

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
  this.checkIfDelegate(this.userId);
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
      this.activityNotificationService.notify('Approval task updated successfully.');
      this.getLIVRequest(this.LIVRequestId);
      // this.cdr.detectChanges();
      // this.isSubmitted = true;
      // Emit an event to the parent component (if needed)
      this.rejectConfirmed.emit(true);

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
 
  
  getLIVRequest(id: any): void {
    // this.isApprover = this.approverList.includes(this.userId);
    this.livRequestService.getLIVRequest(id).subscribe({
      next: (data) => {
        // if (this.isApprover ) {
          this.livRequest = data;
          console.log("GetLIVRequest1", data);
         
      }
      ,
      error: (err) => {
        console.error('Error fetching LIVRequest', err);
      },
    });
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
  isDelegate: boolean = false;
  message:string;
  checkIfDelegate(userId: number) {
    this.CreditLimitReqListSer.isDelegate(userId).subscribe(response => {
      this.isDelegate = response.isDelegate;
      console.log("this.isDelegate",this.isDelegate);

      if(this.isDelegate==true){

        this.CreditLimitReqListSer.getDelegatesApprover(userId).subscribe(response => {
          this.message=`You will reject this as a delegate for Mr. `+response[0].approverName;
          });
          

      }
      console.log('Is Delegate:', this.isDelegate); // For debugging
    });
  }
}
