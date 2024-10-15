import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadPreviewOverviewBasicDetailComponent } from './lead-preview-overview-basic-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';


@NgModule({
  declarations: [LeadPreviewOverviewBasicDetailComponent],
  imports: [
     NgbModule, ContentHeaderModule, CardSnippetModule
  ],
  exports: [
    LeadPreviewOverviewBasicDetailComponent
  ]
})
export class LeadPreviewOverviewBasicDetailModule{ }
