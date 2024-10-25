import { Component, OnInit } from '@angular/core';
import { LivDocumentUploadComponent } from './liv-document-upload/liv-document-upload.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liv-document-section',
  templateUrl: './liv-document-section.component.html',
  styleUrls: ['./liv-document-section.component.scss']
})
export class LivDocumentSectionComponent implements OnInit {
  LIVRequestId: any;
  userName: any;
  userId: any;

  constructor(private modalService: NgbModal,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('currentUser'));

    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
     
      
      this.LIVRequestId = this.route.snapshot.paramMap.get('id');
      console.log(this.LIVRequestId)
      

  } 
  }


  openApproveModal(LIVRequestId: number){
    const modalRef = this.modalService.open(LivDocumentUploadComponent);
    // Pass the LIVRequestId to the modal instance
    modalRef.componentInstance.livRequestId = LIVRequestId;
  }

}
