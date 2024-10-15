import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { LeadPreviewOverviewProductsComponent } from './lead-preview-overview-products.component';


@NgModule({
  declarations: [LeadPreviewOverviewProductsComponent],
  imports: [
     NgbModule, ContentHeaderModule, CardSnippetModule
  ],
  exports: [
    LeadPreviewOverviewProductsComponent
  ]
})
export class LeadPreviewOverviewProductsModule{ }
