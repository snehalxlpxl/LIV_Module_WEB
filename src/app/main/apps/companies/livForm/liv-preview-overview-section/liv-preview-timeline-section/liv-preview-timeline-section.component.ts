import { Component, OnInit } from '@angular/core';
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


  constructor(private timelineService: LivPreviewTimelineSectionService,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = +params['id'];  
      this.loadLivTaskTimeLine(this.taskId); 
    });
  }
  loadLivTaskTimeLine(taskId: number): void {
    this.timelineService.getLivTaskTimeLine(taskId).subscribe(
      data => {
        this.timelineData = data;
        console.log('Timeline Data:', taskId, this.timelineData);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  getRelativeTime(requestedDate: string): string {
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
}


