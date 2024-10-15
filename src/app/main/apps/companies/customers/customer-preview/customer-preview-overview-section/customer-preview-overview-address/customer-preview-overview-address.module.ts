import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPreviewOverviewAddressComponent } from './customer-preview-overview-address.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';



@NgModule({
  declarations: [CustomerPreviewOverviewAddressComponent],
  imports: [
    NgbModule, ContentHeaderModule, CardSnippetModule,CommonModule
  ],
  exports: [
    CustomerPreviewOverviewAddressComponent
  ]
})
export class CustomerPreviewOverviewAddressModule { }
