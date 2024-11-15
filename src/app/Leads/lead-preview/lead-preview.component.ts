import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as snippet from 'app/main/apps/companies/customers/customer-preview/cust.snippetcode';
import { LeadPreviewService } from '../lead-preview.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeadCreateService } from '../lead-create/lead-create.service';
import { HttpClient } from '@angular/common/http';
import { CallLogModalComponent } from './lead-preview-header/call-log-modal/call-log-modal.component';
import { TaskDetailModalComponent } from './lead-preview-header/task-detail-modal/task-detail-modal.component';
import { MeetingInformationModalComponent } from './lead-preview-header/meeting-information-modal/meeting-information-modal.component';
import { LeadStatus } from 'app/Leads/lead-create/LeadStatus';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-lead-preview',
  templateUrl: './lead-preview.component.html',
  styleUrls: ['./lead-preview.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LeadPreviewComponent implements OnInit {
  public contentHeader: object;
  currentComponent: string;
  leadId:any;
  LeadStatuses:any
  leadDetails: any;
  // snippet code variables
  public _snippetCodeBasic = snippet.snippetCodeBasic;
  public _snippetCodeFilled = snippet.snippetCodeFilled;
  public _snippetCodeJustified = snippet.snippetCodeJustified;
  public _snippetCodeCenterAlignment = snippet.snippetCodeCenterAlignment;
  public _snippetCodeRightAlignment = snippet.snippetCodeRightAlignment;
  public _snippetCodeVerticallyStackedPills = snippet.snippetCodeVerticallyStackedPills;
  public _snippetCodePillThemes = snippet.snippetCodePillThemes;
  constructor(private modalService: NgbModal,private route: ActivatedRoute,private router: Router, private leadService: LeadCreateService , private _httpClient: HttpClient, private cd: ChangeDetectorRef,private navigationService: LeadPreviewService
  ) {}

  ngOnInit(): void {
    this.navigationService.component$.subscribe(component => {
      this.currentComponent = component;
    });

this.leadId = this.route.snapshot.paramMap.get('id');
console.log("leadId",this.leadId);

this.fetchLeadDetails();
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
