import { Component, Input, OnInit } from '@angular/core';
import { LivPreviewTimelineSectionService } from './liv-preview-timeline-section.service';
import { ActivatedRoute } from '@angular/router';
import { ActivityNotificationService } from 'app/Leads/lead-preview/lead-preview-activities-section/ActivityNotificationService.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-liv-preview-timeline-section',
  templateUrl: './liv-preview-timeline-section.component.html',
  styleUrls: ['./liv-preview-timeline-section.component.scss']
})
export class LivPreviewTimelineSectionComponent implements OnInit {
  timelineData: any =[];
  creditLimit: number;
  branchName: string;
  taskId: number;
  userName: any;
  userId: any;
  @Input() showDates: boolean = true;
  @Input() taskTimeLineData: any[] = [];
  @Input() finalStatus:string
  approverLevels: any[] = [];  // Store API response



  constructor(private timelineService: LivPreviewTimelineSectionService,private cd: ChangeDetectorRef,
    private route: ActivatedRoute , private activityNotificationService: ActivityNotificationService
  ) { }

  ngOnInit(): void {
    this.fetchApproverLevels();
console.log("finalStatus   +++++++++++",this.finalStatus)
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
  } else {
      console.log('No user data found in sessionStorage');
  }
  
    this.route.params.subscribe(params => {
      this.taskId = +params['id'];  
      console.log("taskTimeLineData++++++++++++++++++++++++++",this.taskTimeLineData);//undefine
      this.cd.markForCheck(); 
      // this.timelineData = this.taskTimeLineData || [];
      
      this.loadLivTaskTimeLine(this.taskId); 
    });
    // this.isApprover = this.approverList.includes(this.userId);
   
  }
  
  // error:true;
  // isApprover : boolean=false;
  // approverList = [113057, 113058, 113059, 113060, 113061, 113062];
  loadLivTaskTimeLine(taskId: number): void {
    console.log("taskId",taskId);
    console.log("loadLivTaskTimeLine call")
    // this.isApprover = this.approverList.includes(this.userId);
    this.timelineService.getLivTaskTimeLine(taskId).subscribe(
      data => {
        console.log("data:",data)

        console.log("createdBy:",data[0].createdById)
        console.log("userId:",this.userId)
        // if (this.isApprover) {
         
        this.taskTimeLineData = data;
        this.cd.markForCheck();  // Force update UI

        console.log('Timeline Data:', taskId, this.timelineData);
      // }else if(data[0].createdById == this.userId){
      //   this.timelineData = data;
      //   console.log('Timeline Data:', taskId, this.timelineData);
      // } else {
      //   this.error=true;
      //     console.log('No matching LIV request found for createdBy:', this.userId);
      // }
     
        // this.timelineData = data;
        // console.log('Timeline Data:', taskId, this.timelineData);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  getRelativeTime(requestedDate: string): string {
    if (!requestedDate) {
      return ''; 
  }
    const now = new Date();
    const pastDate = new Date(requestedDate);
    const diffInMs = now.getTime() - pastDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return '1 day ago';
    } else if (diffInDays > 1) {
      return `${diffInDays} days ago`;
    } else {
      return 'In the future'; // In case the date is in the future
    }
  }
  
  getStatusColor(status: string): string {
    switch (status) {
      case 'Approved': return 'green';
      case 'Rejected': return 'red';
      case 'Awaiting Approval': return 'orange';
      case 'Canceled': return 'purple'; // Note: Use 'darkblue' as a valid CSS color.
      default: return 'black';
    }
  }
  // fetchApproverLevels(): void {
  //   this.timelineService.getApproverLevels(this.creditLimit, this.branchName)
  //     .subscribe({
  //       next: (data) => {
  //         console.log(data);
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       }
  //     });
  // }
  fetchApproverLevels(): void {
    if (this.taskTimeLineData.length > 0) {
      // Assuming the first item in timelineData has the needed properties
      this.creditLimit = this.taskTimeLineData[0].creditLimit;
      this.branchName = this.taskTimeLineData[0].branchName;

      this.timelineService.getApproverLevels(this.creditLimit, this.branchName)
        .subscribe({
          next: (data) => {
            console.log("data for approverLevels ++++++++++++++",data);  // Handle the successful response here
            this.approverLevels = data; // Store response in variable for display

          },
          error: (err) => {
            console.error(err);  // Handle the error here
          }
        });
    } else {
      console.error('Timeline data is empty!');
    }
  }
  formatNumber(value: number): string {
    if (!value) return '';

    let x = value.toString().split('.')[0]; // Handle whole numbers only
    let lastThree = x.substring(x.length - 3); // Get the last three digits
    const otherNumbers = x.substring(0, x.length - 3); // Get the rest of the digits
    if (otherNumbers !== '') lastThree = ',' + lastThree;

    // Format the remaining numbers in pairs of two digits (Indian numbering system)
    const formattedValue =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

    return formattedValue;
  }
}


