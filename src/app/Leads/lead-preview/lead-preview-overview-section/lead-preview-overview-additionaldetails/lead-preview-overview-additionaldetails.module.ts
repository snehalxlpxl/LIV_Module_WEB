import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { LeadPreviewOverviewAdditionaldetailsComponent } from './lead-preview-overview-additionaldetails.component';


@NgModule({
  declarations: [LeadPreviewOverviewAdditionaldetailsComponent],
  imports: [
     NgbModule, ContentHeaderModule, CardSnippetModule
  ],
  exports: [
    LeadPreviewOverviewAdditionaldetailsComponent
  ]
})
export class LeadPreviewOverviewAdditionaldetailsModule{ }
