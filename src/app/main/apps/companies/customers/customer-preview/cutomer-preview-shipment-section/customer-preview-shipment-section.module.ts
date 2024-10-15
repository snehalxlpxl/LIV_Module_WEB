import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPreviewShipmentSectionComponent } from './customer-preview-shipment-section.component';
import { CustomerPreviewHeaderModule } from '../customer-preview-header/customer-preview-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [
    CustomerPreviewShipmentSectionComponent
  ],
  imports: [
    CommonModule,
    CustomerPreviewHeaderModule,
    CardSnippetModule, 
    NgbModule, 
    ContentHeaderModule,
    NgxDatatableModule
  ],
  exports:[
    CustomerPreviewShipmentSectionComponent
  ]
})
export class CustomerPreviewShipmentSectionModule { }
