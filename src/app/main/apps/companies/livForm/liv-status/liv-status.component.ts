import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditLimitReqListService } from '../credit-limit-req-list/credit-limit-req-list.service';
import { RejectModalComponent } from '../liv-preview/reject-modal/reject-modal.component';
import { ApproveModalService } from '../liv-preview/approve-modal/approve-modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityNotificationService } from 'app/Leads/lead-preview/lead-preview-activities-section/ActivityNotificationService.service';

@Component({
  selector: 'app-liv-status',
  templateUrl: './liv-status.component.html',
  styleUrls: ['./liv-status.component.scss']
})
export class LivStatusComponent implements OnInit {

  token: string | null = null;
  status: string | null = null;

   approvalMessage:any;
   rejectedMessage='';

   rejectedException='';
   approvalException='';


  constructor(private route: ActivatedRoute, private CreditLimitReqListSer: CreditLimitReqListService,private modalService:NgbModal,
    private activityNotificationService: ActivityNotificationService
  ) {}

  ngOnInit(): void {
    this.status = this.route.snapshot.paramMap.get('status');
    this.token = this.route.snapshot.paramMap.get('token');

    console.log('Status:', this.status);
    console.log('Token:', this.token);

    if (this.token && this.status) {
      // Call API based on status
      if (this.status.toLowerCase() === 'approve') {
        this.CheckUpdateApprove(this.token)
      } else if (this.status.toLowerCase() === 'reject') {
        this.CheckupdateReject(this.token)
        // this.openRejectModal(this.token);
      }
    }
    

  }

  LIVRequestId:any;
  levelStatusFlag=false;
  openRejectModal() {
      const modalRef = this.modalService.open(RejectModalComponent);
      modalRef.componentInstance.token = this.token;
    // Listen for the rejection confirmation event
    modalRef.componentInstance.rejectConfirmed.subscribe(() => {
      this.levelStatusFlag = true; // Adjust the flag to remove the button
      this.activityNotificationService.notify('Approval task updated successfully.');
    });
    this.activityNotificationService.notifyUpdateApprovalChange();
  }

  CheckUpdateApprove(token: any) {
    this.CreditLimitReqListSer.UpdateApprove(token).subscribe({
      next: (response) => {
        console.log("UpdateApprove Info", response);
  
        // Check if response is an object and contains 'message'
        if (response && typeof response === 'object' && 'message' in response||'text' in response) {
          this.approvalMessage = response;
          console.log('Approval Message:', this.approvalMessage);
        } else {
          console.error("Unexpected response format:", response);
          this.approvalMessage = { message: "Invalid response received." };
        }
      },
      error: (errorResponse) => {
        console.log("Error Response", errorResponse);
  
        // Check if 'text' exists in the error response
        // if (errorResponse?.error?.text) {
        //   // console.log("Error Response text", errorResponse?.error?.text);
        //   this.approvalMessage = { message: errorResponse.error.text };
        // } else {
        //   this.approvalMessage = { message: "An unexpected error occurred." };
        // }

        // Check if 'text' exists in the error response
        if (errorResponse?.error?.text) {
          this.approvalException = errorResponse.error.text;
        } else {
          this.approvalException = "An unexpected error occurred.";
        }
      }
    });
  }


  
  // message: string;
  // CheckUpdateApprove(token: any) {
   
  //   this.CreditLimitReqListSer.UpdateApprove(token).subscribe(response => {
  //     console.log("UpdateApprove Info", response);
      
  //     if (response && typeof response === 'object' && 'message' in response) {
  //       this.approvalMessage = response;
  //       console.log('Approval Message:', this.approvalMessage);
  //     } else {
  //       console.error("Unexpected response format:", response);
  //     }
     
  //   });
  // }
  // CheckupdateReject(token: any) {
   
  //   this.CreditLimitReqListSer.updateReject(token).subscribe(response => {
  //     console.log("updateReject Info", response);

  //     const responseData = Array.isArray(response) ? response[0] : response;

  //     // Extract 'levelStatus' from the response
  //     const levelStatus = responseData?.updatedTask?.levelStatus;
      
  //     if (levelStatus) {

  //       this.rejectedMessage=levelStatus.toString();
  //       console.log('Level Status:', levelStatus);
  //     } else {
  //       console.error('Level Status not found in response');
  //     }
     
  //   });
  // }

  CheckupdateReject(token: any) {
    this.CreditLimitReqListSer.updateReject(token).subscribe({
      next: (response) => {
        console.log("updateReject Info", response);
  
        const responseData = Array.isArray(response) ? response[0] : response;
  
        // Extract 'levelStatus' from the response
        const levelStatus = responseData?.updatedTask?.levelStatus;
  
        if (levelStatus) {
          this.rejectedMessage = levelStatus.toString();
          console.log('Level Status:', levelStatus);
        } else {
          console.error('Level Status not found in response');
        }
      },
      error: (errorResponse) => {
        console.log("Error Response", errorResponse);
        
        // Check if 'text' exists in the error response
        if (errorResponse?.error?.text) {
          this.rejectedException = errorResponse.error.text;
        } else {
          this.rejectedException = "An unexpected error occurred.";
        }
      }
    });
  }
  


}
