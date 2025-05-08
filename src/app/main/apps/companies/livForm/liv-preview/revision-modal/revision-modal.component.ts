import { Component, OnInit,Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LivApproveService } from '../../liv-approve/liv-approve.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LivPreviewService } from '../liv-preview.service';
import { CreditLimitReqListService } from '../../credit-limit-req-list/credit-limit-req-list.service';
import { ActivityNotificationService } from 'app/Leads/lead-preview/lead-preview-activities-section/ActivityNotificationService.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-revision-modal',
  templateUrl: './revision-modal.component.html',
  styleUrls: ['./revision-modal.component.scss']
})
export class RevisionModalComponent implements OnInit {

 isSubmitted = false;
   @Output() rejectConfirmed = new EventEmitter<boolean>();
 
   @Input() LIVRequestId: any; 
   @Input() token:any;
   livRequest: any;
   userName: any;
   userId: any;
 
   constructor(public activeModal: NgbActiveModal,private router: Router,private livApproveService:LivApproveService,private route: ActivatedRoute,private livRequestService: LivPreviewService,private CreditLimitReqListSer:CreditLimitReqListService, private activityNotificationService: ActivityNotificationService
     ,  private cdr: ChangeDetectorRef
   ) { }
 
   ngOnInit(): void {
 
     // if(this.token){
     //   this.GetLivRequestIdbyToken(this.token);
     // }
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
   // GetLivRequestIdbyToken(token:any){
   //   this.CreditLimitReqListSer.updateRejectGetlivRequestId(token).subscribe({
   //     next: (response) => {
   //       console.log("LIVRequestId Info", response);
   //      this.LIVRequestId=response;
   //     }
   //   });
   // }
   confirmRevision(){
    const revisionReason = (document.getElementById('revisionReason') as HTMLInputElement).value;
     
    if (revisionReason) {
      console.log("revisionReason",revisionReason);
      console.log("LIVRequestId",this.LIVRequestId);

      this.deleteLIVApprovalTask(this.LIVRequestId,revisionReason);
               this.close();
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
deleteLIVApprovalTask(id: number,revisionStatus:any): void {
    this.livRequestService.deleteLIVApprovalTask(id,this.userId,revisionStatus).subscribe({
      next: (response) => {
        console.log('Task deleted successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Request Revised',
          text: 'The request has Revised successfully!',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/credit-limit-req-list']); // Navigate after confirmation
        });
        // alert('LIV approval task deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        alert('Failed to delete the LIV approval task.');
      }
    });
  }
}
 //  confirmRejection() {
  //    const rejectionReason = (document.getElementById('rejectionReason') as HTMLInputElement).value;
     
  //    if (rejectionReason) {
  //      // Assuming 'Rejected' is the status you want to send
  //      const status = 'Rejected';
       
  //      // Call the updateApprovalTask service method
  //      this.livApproveService.updateApprovalTask(this.LIVRequestId, status, rejectionReason, this.userId).subscribe(
  //        response => {
  //          console.log('Approval task updated successfully:', response);
  //          // Close the modal after confirming rejection
  //          this.closeModal();
  //          this.close();
  //      this.activityNotificationService.notify('Approval task updated successfully.');
  //      this.getLIVRequest(this.LIVRequestId);
  //      // this.cdr.detectChanges();
  //      // this.isSubmitted = true;
  //      // Emit an event to the parent component (if needed)
  //      this.rejectConfirmed.emit(true);
 
  //        },
  //        error => {
  //          console.error('Error updating approval task:', error);
  //          alert('There was an error processing your request. Please try again.');
  //        }
  //      );
  //    } else {
  //      alert('Please enter a reason for rejection.');
  //    }
  //  }