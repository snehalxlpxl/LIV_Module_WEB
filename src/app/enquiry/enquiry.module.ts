import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { EnquiryPreviewComponent } from './enquiry-preview/enquiry-preview.component';
import { RouterModule } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { EnquireCreateComponent } from './enquire-create/enquire-create.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreDirectivesModule } from '@core/directives/directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule, NgbNavModule,NgbDropdownModule,NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreSidebarModule } from '@core/components';
import { AppComponent } from 'app/app.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EnquiryPreviewOverviewSectionComponent } from './enquiry-preview/enquiry-preview-overview-section/enquiry-preview-overview-section.component';
import { EnquiryPreviewBasicDetailComponent } from './enquiry-preview/enquiry-preview-overview-section/enquiry-preview-basic-detail/enquiry-preview-basic-detail.component';
import { EnquiryPreviewEnquiryComponent } from './enquiry-preview/enquiry-preview-overview-section/enquiry-preview-enquiry/enquiry-preview-enquiry.component';
import { EnquiryPreviewAddressComponent } from './enquiry-preview/enquiry-preview-overview-section/enquiry-preview-address/enquiry-preview-address.component';
import { EnquiryPreviewTimelineComponent } from './enquiry-preview/enquiry-preview-overview-section/enquiry-preview-timeline/enquiry-preview-timeline.component';
import { EnquiryPreviewRatesComponent } from './enquiry-preview/enquiry-preview-rates/enquiry-preview-rates.component';
import { PackageDetailModalComponent } from './enquire-create/package-detail-modal/package-detail-modal.component';
import { RequiredEquipmentModalComponent } from './enquire-create/required-equipment-modal/required-equipment-modal.component';
import { EnquiryAddressModalComponent } from './enquire-create/enquiry-address-modal/enquiry-address-modal.component';
import { NewRateRequestModalComponent } from './enquiry-preview/new-rate-request-modal/new-rate-request-modal.component';
import { OpenRateRequestRevisionModalComponent } from './enquiry-preview/open-rate-request-revision-modal/open-rate-request-revision-modal.component';
import { EnquiryPreviewEditRatesComponent } from './enquiry-preview/enquiry-preview-edit-rates/enquiry-preview-edit-rates.component';
import { WordWrapPipe } from './word-wrap.pipe';



const routes = [
  
  {
    path: 'enquiry-list',
    component: EnquiryListComponent,
    data: { path: 'enquiry-list', animation: 'EnquiryListComponent' }
  },
  {
    path: 'enquiry-create',
    component: EnquireCreateComponent,
    data: { path: 'enquiry-create', animation: 'EnquireCreateComponent' }
  },
  {
    path: 'enquiry/:type/:id',
    component: EnquireCreateComponent,
    data: { path: 'enquiry/:type/:id', animation: 'EnquireCreateComponent' }
  },
  {
    path: 'enquiry-create/:type/:id/:SalesOrLeadOwerId',
    component: EnquireCreateComponent,
    data: { path: 'enquiry-create/:type/:id/:SalesOrLeadOwerId', animation: 'EnquireCreateComponent' }
  },
  // http://localhost:4200/enquiry-preview/250084
 
  {
    path: 'enquiry-preview/:id',
    component: EnquiryPreviewComponent,
    data: { path: 'enquiry-preview/:id', animation: 'EnquiryPreviewComponent' }
  },
  {
    path: 'enquiry-preview/:type/:id',
    component: EnquiryPreviewComponent,
    data: { path: 'enquiry-preview/:type/:id', animation: 'EnquiryPreviewComponent' }
  },
  {
    path: 'enquiry-rate/edit',
    component: EnquiryPreviewEditRatesComponent,
    data: { path: '', animation: 'EnquiryPreviewEditRatesComponent' }
  },
]

@NgModule({
  declarations: [
    WordWrapPipe,
    EnquiryListComponent,
    EnquireCreateComponent,
    EnquiryPreviewComponent,
    EnquiryPreviewOverviewSectionComponent,
    EnquiryPreviewBasicDetailComponent,
    EnquiryPreviewEnquiryComponent,
    EnquiryPreviewAddressComponent,
    EnquiryPreviewTimelineComponent,
    EnquiryPreviewRatesComponent,
    PackageDetailModalComponent,
    RequiredEquipmentModalComponent,
    EnquiryAddressModalComponent,
    NewRateRequestModalComponent,
    OpenRateRequestRevisionModalComponent,
    EnquiryPreviewEditRatesComponent
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
    Ng2FlatpickrModule,
    NgbDropdownModule,
    NgSelectModule,
    CoreSidebarModule,
    ReactiveFormsModule,  
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgbNavModule
  ],
  providers:[NgbNavConfig,WordWrapPipe],
  exports:[
    WordWrapPipe,
    RouterModule,
    EnquiryListComponent,
  ]
})
export class EnquiryModule {
  constructor() {
    console.log('EnquiryModule loaded.');
  }
 }
