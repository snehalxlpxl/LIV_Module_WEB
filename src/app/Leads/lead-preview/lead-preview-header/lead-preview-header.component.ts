import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CallLogModalComponent } from './call-log-modal/call-log-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDetailModalComponent } from './task-detail-modal/task-detail-modal.component';
import { MeetingInformationModalComponent } from './meeting-information-modal/meeting-information-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadStatus } from 'app/Leads/lead-create/LeadStatus';
import { LeadCreateService, LeadSource } from 'app/Leads/lead-create/lead-create.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { LeadPreviewService } from 'app/Leads/lead-preview.service';

@Component({
  selector: 'app-lead-preview-header',
  templateUrl: './lead-preview-header.component.html',
  styleUrls: ['./lead-preview-header.component.scss']
})
export class LeadPreviewHeaderComponent implements OnInit {
  leadId:any;
  LeadStatuses:any
  leadDetails: any;
  currentComponent: string;

  constructor(private modalService: NgbModal,private route: ActivatedRoute,private router: Router, private leadService: LeadCreateService , private _httpClient: HttpClient, private cd: ChangeDetectorRef,private navigationService: LeadPreviewService
) { }

  ngOnInit(): void {
    this.navigationService.component$.subscribe(component => {
      this.currentComponent = component;
    });
this.leadId = this.route.snapshot.paramMap.get('id');
    console.log("leadId",this.leadId);
   
    this.fetchLeadDetails();
    
    // this.fetchLeadStatuses();
    // this.fetchLeadStatus();
  }
  openCallLogModal() {
    const modalRef = this.modalService.open(CallLogModalComponent);
    modalRef.componentInstance.leadId = this.leadId;
  }
  openTaskDetailModal(){
    const modalRef = this.modalService.open(TaskDetailModalComponent);
  modalRef.componentInstance.leadId = this.leadId;
}
  openMeetingInformationModal(){
    const modalRef = this.modalService.open(MeetingInformationModalComponent);
    modalRef.componentInstance.leadId = this.leadId;

  }

fetchLeadStatuses(): void {
  // this.leadService.getLeadStatuses().subscribe(
  //   (data: LeadStatus[]) => {
  //     this.LeadStatuses = data;
  //     console.log("Lead Sources:", this.LeadStatuses);
  //   },
  //   (error) => {
  //     // Handle error
  //     console.error('Error fetching lead sources:', error);
  //   }
  // );
  this.leadService.getLeadStatuses().subscribe(
    (statuses) => {
      console.log(statuses);
      this.leadStatusMap = new Map(statuses.map(status => [status.id, status.name]));
    },
    (error) => {
      console.error('Error fetching lead statuses:', error);
    }
  );
}
setComponent(component: string) {
  this.navigationService.setComponent(component);
}
leadStatusMap = new Map<number, string>();

fetchLeadStatus(): void {
  this._httpClient.get<LeadStatus[]>(`${environment.apiUrl}/Leads/LeadStatus`)
    .subscribe((data: LeadStatus[]) => {
      this.leadStatusMap = new Map(data.map(status => [status.id, status.name]));
      console.log('Lead leadStatusMap:', this.leadStatusMap);
    });
}

getLeadStatusName(statusId: number): string {
  return this.leadStatusMap.get(statusId) || 'Unknown'; // Fallback if not found
}
leadStatusId:any;
fetchLeadDetails(): void {
  this.leadService.getLeadById(this.leadId).subscribe(
    (data) => {
      this.leadDetails = data;
      this.leadStatusId = this.leadDetails.leadStatusId;
      console.log("leadStatusId", this.leadStatusId);
      // Handle the fetched data, such as assigning to variables for display
      console.log("leadDetails",this.leadDetails)
      this.fetchLeadStatusName(this.leadStatusId);
    },
    (error) => {
      // Handle error
      console.error('Error deleting lead:', error);
    }
  );
}
leadStatusName:any;
fetchLeadStatusName(leadStatusId: number): void {
  this.leadService.getLeadStatusById(leadStatusId).subscribe(
    (status:any) => {
      console.log(status.leadStatusName)
      this.leadStatusName = status.leadStatusName;
      this.cd.detectChanges(); 
    },
    (error) => {
      console.error('Error fetching lead status:', error);
    }
  );
}
}
