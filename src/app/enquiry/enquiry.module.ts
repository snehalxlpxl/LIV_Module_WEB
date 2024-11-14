import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { EnquiryPreviewComponent } from './enquiry-preview/enquiry-preview.component';
import { RouterModule } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreDirectivesModule } from '@core/directives/directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreSidebarModule } from '@core/components';


const routes = [
  
  {
    path: 'enquiry-list',
    component: EnquiryListComponent,
    data: { path: 'enquiry-list', animation: 'EnquiryListComponent' }
  },
  {
    path: 'enquiry-preview/:id',
    component: EnquiryPreviewComponent,
    data: { path: 'enquiry-preview/:id', animation: 'EnquiryPreviewComponent' }
  }
]

@NgModule({
  declarations: [
    EnquiryListComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    CoreDirectivesModule,
    NgxDatatableModule,
    FormsModule,
    CorePipesModule,
    NgbModule,
    NgSelectModule,
    CoreSidebarModule,
    ReactiveFormsModule,
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
