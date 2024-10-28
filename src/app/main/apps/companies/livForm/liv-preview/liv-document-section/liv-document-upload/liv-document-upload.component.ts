import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ApproveModalService } from '../../approve-modal/approve-modal.service';
import { CreditLimitReqListService } from '../../../credit-limit-req-list/credit-limit-req-list.service';
import { LivDocumentUploadService } from './liv-document-upload.service';


@Component({
  selector: 'app-liv-document-upload',
  templateUrl: './liv-document-upload.component.html',
  styleUrls: ['./liv-document-upload.component.scss']
})
export class LivDocumentUploadComponent implements OnInit {

  @Input() livRequestId: number;
  approvalSource: string = 'Whatsapp'; // Default approval source
  approvalSources: string[] = ['Whatsapp', 'Email', 'Phone Call', 'Other'];
  notes: string = ''; 
  selectedFile: File | null = null;
  selectedFileName: string = '';
  userName: any;
  userId: any;
  approverId: number;

  constructor(public activeModal: NgbActiveModal,private LivDocumentUploadSer:LivDocumentUploadService,private ApproveModalSer:ApproveModalService,private route: ActivatedRoute,private CreditLimitReqListSer:CreditLimitReqListService) {}


  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
    }
    this.fetchApprover(this.userId);
    this.checkIfDelegate(this.userId);
    // this.getDocumentsList();
  }

  // Method to handle file selection
  // onFileSelect(event: any): void {
  //   if (event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0];
  //     this.selectedFileName = this.selectedFile.name;
  //   }
  // }
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
        ApprovalSource: this.approvalSource,
        ApprovalFileName: this.selectedFileName,

        UserId: this.userId,
        ApproverId:this.approverId,
        Status:"Approved",
        RejectReason:"",
        livrequestId:this.livRequestId,
        // Note: this.notes || `Approval confirmed on ${this.approvalSource}`
      };
      console.log(approvalData);

      this.LivDocumentUploadSer.livUploadFile(this.selectedFile,this.livRequestId,this.userId).subscribe(
        (response) => {
          Swal.fire('Confirmed!', 'Your document has been uploaded and path saved.', 'success');
          this.activeModal.close(response);
        },
        (error) => {
          console.error('Error uploading file', error);
          Swal.fire('Error!', 'File upload failed. Please try again.', 'error');
        }
      );
      // Perform any actions like uploading the file or API calls, then close modal
      console.log('Approval confirmed', approvalData);
      this.activeModal.close(approvalData);

      // Optionally show success message
      Swal.fire('Confirmed!', 'Your approval has been confirmed.', 'success');
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