import { Component, OnInit } from '@angular/core';
import { LivDocumentUploadComponent } from './liv-document-upload/liv-document-upload.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { LivDocumentUploadService } from './liv-document-upload/liv-document-upload.service';
import { ActivityNotificationService } from 'app/Leads/lead-preview/lead-preview-activities-section/ActivityNotificationService.service';

@Component({
  selector: 'app-liv-document-section',
  templateUrl: './liv-document-section.component.html',
  styleUrls: ['./liv-document-section.component.scss']
})
export class LivDocumentSectionComponent implements OnInit {
  LIVRequestId: any;
  userName: any;
  userId: any;
  notificationSubscription: any;

  constructor(private modalService: NgbModal,private route: ActivatedRoute,private LivDocumentUploadSer:LivDocumentUploadService,
    private activityNotificationService:ActivityNotificationService

  ) { }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('currentUser'));

    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
     
      
      this.LIVRequestId = this.route.snapshot.paramMap.get('id');
      console.log(this.LIVRequestId)

      this.notificationSubscription = this.activityNotificationService.notifications.subscribe(
        (message) => {
          if (message === 'LivDocumentSectionComponentUpdated') {
            this.refreshDocuments();
          }
        }
      );

  } 
  this.getDocumentsList();
  }


  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
  refreshDocuments(): void {
    console.log('Refreshing documents in LivDocumentSectionComponent...');
    // Add logic to refresh or fetch updated data
    this.getDocumentsList();

  }

  openApproveModal(LIVRequestId: number){
    const modalRef = this.modalService.open(LivDocumentUploadComponent);
    // Pass the LIVRequestId to the modal instance
    modalRef.componentInstance.livRequestId = LIVRequestId;
  }
  BindApproveModal(LIVRequestId: number,documentId:number){
    const modalRef = this.modalService.open(LivDocumentUploadComponent);
    // Pass the LIVRequestId to the modal instance
    modalRef.componentInstance.livRequestId = LIVRequestId;
    modalRef.componentInstance.documentId = documentId;
  }

  documents: any[] = [];
  getDocumentsList(): void {
    this.LivDocumentUploadSer.getDocuments(this.LIVRequestId).subscribe(
      (response) => {
        this.documents = response;
        
        console.log(" this.documents", this.documents);
      },
      (error) => {
        console.error('Error fetching documents', error);
      }
    );

}

}
