import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { LeadPreviewOverviewTimelineComponent } from './lead-preview-overview-timeline.component';


@NgModule({
  declarations: [LeadPreviewOverviewTimelineComponent],
  imports: [
     NgbModule, ContentHeaderModule, CardSnippetModule
  ],
  exports: [
    LeadPreviewOverviewTimelineComponent
  ]
})
export class LeadPreviewOverviewTimelineModule{ }
