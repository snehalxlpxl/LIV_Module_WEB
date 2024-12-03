import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CustomerPreviewHeaderModule } from './customer-preview-header/customer-preview-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { CustomerPreviewOverviewBasicDetailModule } from './customer-preview-overview-section/customer-preview-overview-basic-detail/customer-preview-overview-basic-detail.module';
// import { CustomerPreviewOverviewAddressModule } from './customer-preview-overview-section/customer-preview-overview-address/customer-preview-overview-address.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
// import { CustomerPreviewOverviewContactsModule } from './customer-preview-overview-section/customer-preview-overview-contact /customer-preview-overview-contacts.module';
// import { CustomerPreviewOverviewTimelineModule } from './customer-preview-overview-section/customer-preview-overview-timeline/customer-preview-overview-timeline.module';
// import { CustomerPreviewOverviewTotalSalesProfitModule } from './customer-preview-overview-section/customer-preview-overview-total-sales-profit/customer-preview-overview-total-sales-profit.module';
// import { CustomerPreviewOverviewSectionModule } from './customer-preview-overview-section/customer-preview-overview-section.module';
import { RouterModule } from '@angular/router';
import { LeadPreviewComponent } from './lead-preview.component';
import { CustomerPreviewHeaderModule } from 'app/main/apps/companies/customers/customer-preview/customer-preview-header/customer-preview-header.module';
import { LeadPreviewHeaderModule } from './lead-preview-header/lead-preview-header.module';
import { LeadPreviewOverviewSectionComponent } from './lead-preview-overview-section/lead-preview-overview-section.component';
import { LeadPreviewOverviewSectionModule } from './lead-preview-overview-section/lead-preview-overview-section.module';
import { LeadPreviewActivitiesSectionComponent } from './lead-preview-activities-section/lead-preview-activities-section.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LeadPreviewEnquiryListSectionComponent } from './lead-preview-enquiry-list-section/lead-preview-enquiry-list-section.component';



@NgModule({
  declarations: [LeadPreviewComponent, LeadPreviewActivitiesSectionComponent, LeadPreviewEnquiryListSectionComponent],
  imports: [
    CommonModule,
    LeadPreviewHeaderModule,
    LeadPreviewOverviewSectionModule,
    CardSnippetModule,
    NgbModule,
    ContentHeaderModule,
    RouterModule,
    NgxDatatableModule
  ]
})
export class LeadPreviewModule { }
