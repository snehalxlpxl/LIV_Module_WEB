import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-approve-modal',
  templateUrl: './approve-modal.component.html',
  styleUrls: ['./approve-modal.component.scss']
})
export class ApproveModalComponent implements OnInit {
  approvalSource: string = 'Whatsapp'; // Default approval source
  approvalSources: string[] = ['Whatsapp', 'Email', 'Phone Call', 'Other'];
  notes: string = ''; 
  selectedFile: File | null = null;
  selectedFileName: string = '';

  constructor(public activeModal: NgbActiveModal) {}


  ngOnInit(): void {
  }

  // Method to handle file selection
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }
  // Method to close modal
  closeModal(): void {
    this.activeModal.dismiss('Modal dismissed');
  }

  // Method to confirm approval with selected data
  confirmApproval(): void {
    const approvalData = {
      source: this.approvalSource,
      file: this.selectedFile,
      notes: this.notes || `Approval confirmed on ${this.approvalSource}`
    };
    
    // Perform any actions like uploading the file or API calls, then close modal
    console.log('Approval confirmed', approvalData);
    this.activeModal.close(approvalData);
  }

}
