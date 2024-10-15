import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPreviewOverviewContactsComponent } from './customer-preview-overview-contacts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';



@NgModule({
  declarations: [
    CustomerPreviewOverviewContactsComponent
  ],
  imports: [
    CommonModule,NgbModule, ContentHeaderModule, CardSnippetModule
  ],
  exports:[
    CustomerPreviewOverviewContactsComponent
  ]
})
export class CustomerPreviewOverviewContactsModule { }
