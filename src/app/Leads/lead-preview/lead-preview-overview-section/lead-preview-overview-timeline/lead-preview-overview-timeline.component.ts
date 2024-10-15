import { Component, OnInit } from '@angular/core';
import * as snippet from 'app/main/apps/companies/customers/customer-preview/customer-preview-overview-section/customer-preview-overview-timeline/customer-preview-overview-timeline-snippetcode';

@Component({
  selector: 'app-lead-preview-overview-timeline',
  templateUrl: './lead-preview-overview-timeline.component.html',
  styleUrls: ['./lead-preview-overview-timeline.component.scss']
})
export class LeadPreviewOverviewTimelineComponent implements OnInit {

 
  // public
  public contentHeader: object;
  public showReportBasic = true;
  public showReportIcons = true;

  // snippet code variables
  public _snippetCodeBasic = snippet.snippetCodeBasic;
  public _snippetCodeIcons = snippet.snippetCodeIcons;

  constructor() {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Timeline',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Components',
            isLink: true,
            link: '/'
          },
          {
            name: 'Timeline',
            isLink: false
          }
        ]
      }
    };
  }
}
