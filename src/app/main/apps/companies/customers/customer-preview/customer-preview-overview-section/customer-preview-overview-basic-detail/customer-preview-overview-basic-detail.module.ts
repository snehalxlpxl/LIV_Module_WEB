import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPreviewOverviewBasicDetailComponent } from './customer-preview-overview-basic-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';


@NgModule({
  declarations: [CustomerPreviewOverviewBasicDetailComponent],
  imports: [
     NgbModule, ContentHeaderModule, CardSnippetModule,CommonModule
  ],
  exports: [
    CustomerPreviewOverviewBasicDetailComponent
  ]
})
export class CustomerPreviewOverviewBasicDetailModule { }
