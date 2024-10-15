import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPreviewOverviewSectionComponent } from './customer-preview-overview-section.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerPreviewOverviewBasicDetailModule } from './customer-preview-overview-basic-detail/customer-preview-overview-basic-detail.module';
import { CustomerPreviewOverviewAddressModule } from './customer-preview-overview-address/customer-preview-overview-address.module';
import { CustomerPreviewOverviewContactsModule } from './customer-preview-overview-contact /customer-preview-overview-contacts.module';
import { CustomerPreviewOverviewTimelineModule } from './customer-preview-overview-timeline/customer-preview-overview-timeline.module';
import { CustomerPreviewOverviewTotalSalesProfitModule } from './customer-preview-overview-total-sales-profit/customer-preview-overview-total-sales-profit.module';
import { CustomerPreviewHeaderModule } from '../customer-preview-header/customer-preview-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';



@NgModule({
  declarations: [
    CustomerPreviewOverviewSectionComponent
  ],
  imports: [
    
    CustomerPreviewOverviewBasicDetailModule,
    CustomerPreviewOverviewAddressModule,
    CustomerPreviewOverviewContactsModule,
    CustomerPreviewOverviewTimelineModule,
    CustomerPreviewOverviewTotalSalesProfitModule,
     CardSnippetModule, 
    NgbModule, 
    ContentHeaderModule,
  ],
  exports:[CustomerPreviewOverviewSectionComponent,RouterModule]
})
export class CustomerPreviewOverviewSectionModule { }
