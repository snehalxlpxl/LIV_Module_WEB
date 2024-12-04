import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPreviewHeaderModule } from './customer-preview-header/customer-preview-header.module';
import { CustomerPreviewComponent } from './customer-preview.component';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CustomerPreviewOverviewSectionModule } from './customer-preview-overview-section/customer-preview-overview-section.module';
import { RouterModule } from '@angular/router';
import { CustomerPreviewShipmentSectionModule } from './cutomer-preview-shipment-section/customer-preview-shipment-section.module';
import { CustomerPreviewTransacSectionComponent } from './customer-preview-transac-section/customer-preview-transac-section.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomerEnquiryListSectionComponent } from './customer-enquiry-list-section/customer-enquiry-list-section.component';

@NgModule({
  declarations: [CustomerPreviewComponent, CustomerPreviewTransacSectionComponent, CustomerEnquiryListSectionComponent],
  imports: [
    CommonModule,
    CustomerPreviewHeaderModule,
    CustomerPreviewOverviewSectionModule,
    CustomerPreviewShipmentSectionModule,
    CardSnippetModule, 
    NgbModule, 
    ContentHeaderModule,
    NgxDatatableModule,
    RouterModule,
    
  ]
})
export class CustomerPreviewModule { }
