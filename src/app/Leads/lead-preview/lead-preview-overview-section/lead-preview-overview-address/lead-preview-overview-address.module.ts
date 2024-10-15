import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { LeadPreviewOverviewAddressComponent } from './lead-preview-overview-address.component';


@NgModule({
  declarations: [LeadPreviewOverviewAddressComponent],
  imports: [
     NgbModule, ContentHeaderModule, CardSnippetModule
  ],
  exports: [
    LeadPreviewOverviewAddressComponent
  ]
})
export class LeadPreviewOverviewAddressModule{ }
