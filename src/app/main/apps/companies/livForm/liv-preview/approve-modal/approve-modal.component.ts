import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ApproveModalService } from './approve-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditLimitReqListService } from '../../credit-limit-req-list/credit-limit-req-list.service';
import { LivDocumentUploadService } from '../liv-document-section/liv-document-upload/liv-document-upload.service';
import { ActivityNotificationService } from 'app/Leads/lead-preview/lead-preview-activities-section/ActivityNotificationService.service';

@Component({
  selector: 'app-approve-modal',
  templateUrl: './approve-modal.component.html',
  styleUrls: ['./approve-modal.component.scss']
})
export class ApproveModalComponent implements OnInit {
  @Input() livRequestId: number;
  selectedSource: { id: number; value: string } | null = null; // Initialize as null

  approvalSources = [
    { id: 1, value: 'Whatsapp' },
    { id: 2, value: 'Email' },
    { id: 3, value: 'Phone Call' },
    { id: 4, value: 'Other' }
  ];
  notes: string = ''; 
  selectedFile: File | null = null;
  selectedFileName: string = '';
  userName: any;
  userId: any;
  LIVRequestId: any;
  approverId: number;

  constructor(public activeModal: NgbActiveModal,private activityNotificationService: ActivityNotificationService,  private ApproveModalSer:ApproveModalService,private route: ActivatedRoute,private CreditLimitReqListSer:CreditLimitReqListService,
    private LivDocumentUploadSer:LivDocumentUploadService,private cdr: ChangeDetectorRef,private router: Router) {}


  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('currentUser'));

    this.LIVRequestId = this.route.snapshot.paramMap.get('id');
    console.log("this.LIVRequestId",this.LIVRequestId)

    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
    }
    this.fetchApprover(this.userId);
    this.checkIfDelegate(this.userId);
  }

  // Method to handle file selection
  // onFileSelect(event: any): void {
  //   if (event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0];
  //     this.selectedFileName = this.selectedFile.name;
  //   }
  // }
  SourceId:number;
  sourceName:string
  // Method to handle the change event
  onSourceChange(event: Event): void {
    const selectedValue = this.selectedSource; // Now this holds the selected object
    console.log('Selected Source ID:', selectedValue?.id);
    this.SourceId=selectedValue?.id;
    console.log('Selected Source Value:', selectedValue?.value);
    this.sourceName=selectedValue?.value;

    // Perform any additional logic you need here
  }

  onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = file.name;

      const allowedExtensions = ['pdf', 'jpeg', 'jpg', 'png', 'eml'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!allowedExtensions.includes(fileExtension!)) {
        alert('Invalid file format. Please select a valid file (PDF, JPEG, PNG, or EML).');
        // Clear the input if invalid
        event.target.value = null;
        this.selectedFileName = 'No file chosen';
      }
    }
  }
  // Method to close modal
  closeModal(): void {
    this.activeModal.dismiss('Modal dismissed');
  }

  // Method to confirm approval with selected data
  

confirmApproval(): void {
  // Display confirmation dialog
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to confirm the approval?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, confirm it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // If user confirms the approval
      const approvalData = {
        ApprovalSource: this.sourceName,
        ApprovalFileName: this.selectedFileName,
        UserId: this.userId,
        ApproverId:this.approverId,
        Status:"Approved",
        RejectReason:"",
        livrequestId:this.livRequestId,
        Note: this.notes || `Approval confirmed on ${this.sourceName}`
      };
      console.log(approvalData);

      //


      //
      this.LivDocumentUploadSer.livUploadFile3(this.selectedFile,this.livRequestId,this.userId,this.sourceName,this.SourceId).subscribe(
        (fileResponse) => {
         
          this.ApproveModalSer.updateApprovalTaskForDelegate(approvalData).subscribe(
            (res) => {
              console.log('Task updated successfully', res);
              this.activityNotificationService.notify('Approval task updated successfully.');
              this.activityNotificationService.notifyUpdateApprovalChange();
             

                 // Perform any actions like uploading the file or API calls, then close modal
            console.log('Approval confirmed', approvalData);
            this.activeModal.close(approvalData);

            // // Optionally show success message
            Swal.fire('Confirmed!', 'Your approval has been confirmed.', 'success');

            this.router.navigate([`/liv-preview/${this.livRequestId}`]).then(() => {
              window.location.reload();
              this.cdr.detectChanges();
            });

            },
            (err) => {
              console.error('Error updating task', err);
            }
          );
        },
        (fileErr) => {
          console.error('Error uploading file', fileErr);
        }
      );
   
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // If user cancels, show cancellation message
      Swal.fire('Cancelled', 'Approval was not confirmed.', 'error');
    }
  });
}

fetchApprover(delegateId: number) {
  this.ApproveModalSer.getApproverByDelegateId(delegateId).subscribe(
    response => {
      this.approverId = response[0].approverId;
      console.log('Approver ID:', this.approverId);
    },
    error => {
      console.error('Error fetching approver ID:', error);
    }
  );
}

isDelegate: boolean = false;
  message:string;
  checkIfDelegate(userId: number) {
    this.CreditLimitReqListSer.isDelegate(userId).subscribe(response => {
      this.isDelegate = response.isDelegate;
      console.log("this.isDelegate",this.isDelegate);

      if(this.isDelegate==true){

        this.CreditLimitReqListSer.getDelegatesApprover(userId).subscribe(response => {
          this.message=`You will approve this as a delegate for Mr.  `+response[0].approverName;
          });
          

      }
      console.log('Is Delegate:', this.isDelegate); // For debugging
    });
  }


}
