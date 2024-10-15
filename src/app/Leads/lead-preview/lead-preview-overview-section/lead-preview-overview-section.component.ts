import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lead-preview-overview-section',
  templateUrl: './lead-preview-overview-section.component.html',
  styleUrls: ['./lead-preview-overview-section.component.scss']
})
export class LeadPreviewOverviewSectionComponent implements OnInit {
  leadId:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
 
    const leadId = this.route.snapshot.paramMap.get('id');
    console.log("leadId",leadId);
  }

}
