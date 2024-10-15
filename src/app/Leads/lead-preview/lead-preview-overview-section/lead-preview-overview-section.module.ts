import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LeadPreviewOverviewSectionComponent } from './lead-preview-overview-section.component';
import { LeadPreviewOverviewBasicDetailModule } from './lead-preview-overview-basic-detail/lead-preview-overview-basic-details.module';
import { LeadPreviewOverviewAdditionaldetailsModule } from './lead-preview-overview-additionaldetails/lead-preview-overview-additionaldetails.module';
import { LeadPreviewOverviewProductsModule } from './lead-preview-overview-products/lead-preview-overview-products.module';
import { LeadPreviewOverviewTimelineModule } from './lead-preview-overview-timeline/lead-preview-overview-timeline.module';
import { LeadPreviewOverviewAddressModule } from './lead-preview-overview-address/lead-preview-overview-address.module';
const routes: Routes = [
  { path: 'lead/preview/overview', component: LeadPreviewOverviewSectionComponent },
];


@NgModule({
  declarations: [
    LeadPreviewOverviewSectionComponent
  ],
  imports: [
    CommonModule,RouterModule.forRoot(routes),
   LeadPreviewOverviewBasicDetailModule,
   LeadPreviewOverviewAdditionaldetailsModule,
   LeadPreviewOverviewProductsModule,
   LeadPreviewOverviewTimelineModule,
   LeadPreviewOverviewAddressModule
    
  ],
  exports:[LeadPreviewOverviewSectionComponent,RouterModule]
})
export class LeadPreviewOverviewSectionModule { }
