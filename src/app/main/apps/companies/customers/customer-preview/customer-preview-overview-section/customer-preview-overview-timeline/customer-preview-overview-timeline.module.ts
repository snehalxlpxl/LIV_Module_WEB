import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPreviewOverviewTimelineComponent } from './customer-preview-overview-timeline.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


@NgModule({
  declarations: [
    CustomerPreviewOverviewTimelineComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ContentHeaderModule,
    CoreCommonModule,
    CardSnippetModule
  ],
  exports:[CustomerPreviewOverviewTimelineComponent]
})
export class CustomerPreviewOverviewTimelineModule { }
