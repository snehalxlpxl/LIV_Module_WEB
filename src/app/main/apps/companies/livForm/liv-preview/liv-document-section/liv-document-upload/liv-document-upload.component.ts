import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ApproveModalService } from '../../approve-modal/approve-modal.service';
import { CreditLimitReqListService } from '../../../credit-limit-req-list/credit-limit-req-list.service';
import { LivDocumentUploadService } from './liv-document-upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-liv-document-upload',
  templateUrl: './liv-document-upload.component.html',
  styleUrls: ['./liv-document-upload.component.scss']
})
export class LivDocumentUploadComponent implements OnInit {

  @Input() livRequestId: number;
  @Input() documentId: number;
  selectedSourceId: any;
  uploadForm: FormGroup;
  // approvalSource: string = 'Whatsapp'; // Default approval source
  // approvalSources: string[] = ['Whatsapp', 'Email', 'Phone Call', 'Other'];
  selectedSource: { id: number; value: string } | null = null; // Initialize as null

  approvalSources = [
    { id: 1, value: 'Whatsapp' },
    { id: 2, value: 'Email' },
    { id: 3, value: 'Phone Call' },
    { id: 4, value: 'Other' }
  ];
  
  notes: string = ''; 
  sourceName:string='';
  selectedFile: File | null = null;
  selectedFileName: string = 'No file chosen';
  userName: any;
  userId: any;
  approverId: number;

  constructor(public activeModal: NgbActiveModal,private LivDocumentUploadSer:LivDocumentUploadService,private ApproveModalSer:ApproveModalService,private route: ActivatedRoute,private CreditLimitReqListSer:CreditLimitReqListService,private fb: FormBuilder) {
    this.selectedSource = this.approvalSources[0]; 
  }


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
    this.getDocumentsById();

    this.uploadForm = this.fb.group({
      approvalSource: [''],
      selectedFileName: ['']
    });
  }

  // Method to handle file selection
  // onFileSelect(event: any): void {
  //   if (event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0];
  //     this.selectedFileName = this.selectedFile.name;
  //   }
  // }

  // Method to handle the change event
  SourceId:number;
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
  

UploadLivDoc(): void {
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
        SourceId: this.SourceId,
        ApprovalFileName: this.selectedFileName,
        SorceName:this.sourceName ,
        UserId: this.userId,
        ApproverId:this.approverId,
        Status:"Approved",
        RejectReason:"",
        livrequestId:this.livRequestId,
        // Note: this.notes || `Approval confirmed on ${this.approvalSource}`
      };
      console.log(approvalData);

      this.LivDocumentUploadSer.livUploadFile3(this.selectedFile,this.livRequestId,this.userId,this.sourceName,this.SourceId).subscribe(
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
      Swal.fire('Confirmed!', 'Your Document Uploaded Successfully', 'success');
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

  documents: any[] = [];
  getDocumentsById(): void {
    this.LivDocumentUploadSer.getDocumentsById(this.livRequestId, this.documentId).subscribe(
      (data) => {
        this.uploadForm.patchValue({
          selectedFileName: data[0]?.documentName || 'No file chosen'
        });
      },
      (error) => {
        console.error('Error fetching document data', error);
      }
    );
  }

}