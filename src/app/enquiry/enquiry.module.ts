import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { EnquiryPreviewComponent } from './enquiry-preview/enquiry-preview.component';
import { RouterModule } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';


const routes = [
  
  {
    path: 'enquiry-list',
    component: EnquiryListComponent,
    data: { path: 'enquiry-list', animation: 'EnquiryListComponent' }
  },
  {
    path: 'enquiry-preview',
    component: EnquiryPreviewComponent,
    data: { path: 'enquiry-preview', animation: 'EnquiryPreviewComponent' }
  }
]

@NgModule({
  declarations: [
    EnquiryListComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule 

  ],
  providers:[],
  exports:[
    RouterModule,
    EnquiryListComponent
  ]
})
export class EnquiryModule {
  constructor() {
    console.log('EnquiryModule loaded.');
  }
 }
