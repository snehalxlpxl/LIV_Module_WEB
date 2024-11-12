import { Component, Input, OnInit } from '@angular/core';
import { LivPreviewTimelineSectionService } from './liv-preview-timeline-section.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liv-preview-timeline-section',
  templateUrl: './liv-preview-timeline-section.component.html',
  styleUrls: ['./liv-preview-timeline-section.component.scss']
})
export class LivPreviewTimelineSectionComponent implements OnInit {
  timelineData: any =[];
  taskId: number;
  userName: any;
  userId: any;
  @Input() showDates: boolean = true;
  @Input() taskTimeLineData: any[] = [];


  constructor(private timelineService: LivPreviewTimelineSectionService,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
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
      console.log("taskTimeLineData++++++++++++++++++++++++++",this.taskTimeLineData);
      // this.timelineData = this.taskTimeLineData || [];
      // this.loadLivTaskTimeLine(this.taskId); 
    });
    // this.isApprover = this.approverList.includes(this.userId);
  }
  
  // error:true;
  // isApprover : boolean=false;
  // approverList = [113057, 113058, 113059, 113060, 113061, 113062];
  loadLivTaskTimeLine(taskId: number): void {
    // this.isApprover = this.approverList.includes(this.userId);
    this.timelineService.getLivTaskTimeLine(taskId).subscribe(
      data => {
        console.log("data:",data)

        console.log("createdBy:",data[0].createdById)
        console.log("userId:",this.userId)
        // if (this.isApprover) {
         
        this.timelineData = data;
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
  // getRelativeTime(requestedDate: string): string {
  //   if (!requestedDate) {
  //     return ''; 
  // }
  //   const now = new Date();
  //   const pastDate = new Date(requestedDate);
  //   const diffInMs = now.getTime() - pastDate.getTime();
  //   const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  //   if (diffInDays === 0) {
  //     return 'Today';
  //   } else if (diffInDays === 1) {
  //     return '1 day ago';
  //   } else if (diffInDays > 1) {
  //     return `${diffInDays} days ago`;
  //   } else {
  //     return 'In the future'; // In case the date is in the future
  //   }
  // }
  getRelativeTime(date: string | Date): string {
    if (!date) {
      return ''; // Return empty string if date is null or undefined
    }
  
    const givenDate = new Date(date);
    
    // Check if the date is invalid
    if (isNaN(givenDate.getTime())) {
      return ''; // Return empty string if the date is invalid
    }
  
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - givenDate.getTime()) / 1000);
  
    if (secondsAgo < 60) {
      return `${secondsAgo} second${secondsAgo > 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    }
  }
  

}


