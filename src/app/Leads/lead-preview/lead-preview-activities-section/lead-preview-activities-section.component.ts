import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { LeadCreateService } from 'app/Leads/lead-create/lead-create.service';
import { CallLogModalComponent } from '../lead-preview-header/call-log-modal/call-log-modal.component';
import { TaskDetailModalComponent } from '../lead-preview-header/task-detail-modal/task-detail-modal.component';
import { MeetingInformationModalComponent } from '../lead-preview-header/meeting-information-modal/meeting-information-modal.component';
import Swal from 'sweetalert2';
import { ActivityNotificationService } from './ActivityNotificationService.service';

@Component({
  selector: 'app-lead-preview-activities-section',
  templateUrl: './lead-preview-activities-section.component.html',
  styleUrls: ['./lead-preview-activities-section.component.scss']
})
export class LeadPreviewActivitiesSectionComponent implements OnInit {
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = '';
  leadId: any;
  // Data for Open and Closed Activities
  openActivities: any[] = [];
  closedActivities: any[] = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  public previousStatusFilter = '';
  // Maps to store activity types and corresponding icons
  activityIconMap = new Map<string, string>();

  constructor(private route: ActivatedRoute, private activityService: LeadCreateService, private modalService: NgbModal,  private activityNotificationService: ActivityNotificationService,
  ) {
    // Initialize the icon map
    // this.activityIconMap.set('phone', 'fa-phone');
    // this.activityIconMap.set('meeting', 'fa-calendar');
    // this.activityIconMap.set('check-financials', 'fa-money-check-alt');

  }

  ngOnInit(): void {
    const leadId = this.route.snapshot.paramMap.get('id');
    console.log("leadId", leadId);
    this.loadActivities(leadId);

    // Subscribe to activity changes
    this.activityNotificationService.activities$.subscribe(() => {
      this.loadActivities(leadId);
    });
  }
  private loadActivities(leadId: string): void {

    this.activityService.getActivities(leadId).subscribe(activities => {
      this.openActivities = activities.filter(activity => activity.status === 'Pending', 'Scheduled');
      this.closedActivities = activities.filter(activity => activity.status === 'Completed');
      console.log("Activities", activities)
    });
  }
  // Method to return the appropriate icon class based on activity type
  getIconClass(type: string): string {
    switch (type) {
      case 'call':
        return 'fas fa-phone';
      case 'meeting':
        return 'fas fa-calendar'; // Corrected class name
      case 'task':
        return 'fas fa-tasks'; // Corrected class name
      default:
        return 'fas fa-info-circle';
    }
  }
  logRowAndOpenModal(row: any) {
    console.log('Row Data:', row); // Log row to check if the properties are available
    this.openModal(row.activityType, row.activityId, row.leadId);
  }

  openModal(activityType: string, activityId: any, leadId: any) {
    let modalRef;
    switch (activityType) {
      case 'call':
        modalRef = this.modalService.open(CallLogModalComponent);
        break;
      case 'task':
        modalRef = this.modalService.open(TaskDetailModalComponent);
        break;
      case 'meeting':
        modalRef = this.modalService.open(MeetingInformationModalComponent);
        break;
      default:
        return;
    }
    modalRef.componentInstance.activityId = activityId;
    modalRef.componentInstance.leadId = leadId;
    console.log('Passed to modal:', { activityId: modalRef.componentInstance.activityId, leadId: modalRef.componentInstance.leadId });
  }
  onDelete(id, activityType) {
    console.log(id);
    this.activityService.deleteActivity(id, activityType).subscribe(
      response => {
        console.log('Activity deleted successfully:', response);
        Swal.fire('Success', 'Deleted successfully', 'success');

        // window.location.reload();
        this.activityNotificationService.notifyActivitiesChange(); // Notify change

        // Handle successful deletion (e.g., update UI, show success message)
      },
      error => {
        console.error('Error deleting activity:', error);
        // Handle error (e.g., show error message)
        Swal.fire('Error', 'Failed to Delete', 'error');

      }
    );
    
  }
  
  
}
