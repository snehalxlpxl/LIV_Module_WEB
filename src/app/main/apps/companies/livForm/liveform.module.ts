import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CreditLimitReqListComponent } from './credit-limit-req-list/credit-limit-req-list.component';
import { RouterModule } from '@angular/router';
import { LivPreviewComponent } from './liv-preview/liv-preview.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LivPreviewOverviewSectionComponent } from './liv-preview-overview-section/liv-preview-overview-section.component';
import { LivPreviewDocumentsSectionComponent } from './liv-preview-documents-section/liv-preview-documents-section.component';
import { LivPreviewOverviewSectionBasicDetailsComponent } from './liv-preview-overview-section/liv-preview-overview-section-basic-details/liv-preview-overview-section-basic-details.component';
import { LivPreviewTimelineSectionComponent } from './liv-preview-overview-section/liv-preview-timeline-section/liv-preview-timeline-section.component';
import { LivOverviewSectionSummaryComponent } from './liv-preview-overview-section/liv-overview-section-summary/liv-overview-section-summary.component';
import { RejectModalComponent } from './liv-preview/reject-modal/reject-modal.component';
import { ApproveModalComponent } from './liv-preview/approve-modal/approve-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreditLimitRequestModalComponent } from './credit-limit-req-list/credit-limit-request-modal/credit-limit-request-modal.component';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { LivApproveComponent } from './liv-approve/liv-approve.component';
import { AuthGuard } from 'app/auth/helpers'
import { LivTaskApproverListComponent } from './liv-task-approver-list/liv-task-approver-list.component';
import { LoadListSaleOrApproverComponent } from './load-list-sale-or-approver/load-list-sale-or-approver.component';
import { LivDocumentSectionComponent } from './liv-preview/liv-document-section/liv-document-section.component';
import { LivDocumentUploadComponent } from './liv-preview/liv-document-section/liv-document-upload/liv-document-upload.component';
import { ApprovemsgpageComponent } from './approvemsgpage/approvemsgpage.component';
import { RejectmsgpageComponent } from './rejectmsgpage/rejectmsgpage.component';
import { InvalidmsgpageComponent } from './invalidmsgpage/invalidmsgpage.component';

const routes = [ 
  
  {
    path: 'load-list',
    component: LoadListSaleOrApproverComponent,
    canActivate: [AuthGuard]  ,
    data: { path: 'load-list', animation: 'LoadListSaleOrApproverComponent' }
  },
  {
    path: 'credit-limit-req-list',
    component: CreditLimitReqListComponent,
    data: { path: 'credit-limit-req-list', animation: 'CreditLimitReqListComponent' },
    canActivate: [AuthGuard]     

  },
  {
    path: 'liv-preview',
    component: LivPreviewComponent,
    data: { path: 'liv-preview', animation: 'LivPreviewComponent' },
    canActivate: [AuthGuard]     
  },
  {
    path: 'liv-request/:id',
    component: LivApproveComponent,
    data: { path: 'liv-request/:id', animation: 'LivApproveComponent' },
    canActivate: [AuthGuard]     

  },
  {
    path: 'liv-preview/:id',
    component: LivPreviewComponent,
    data: {  animation: 'LivPreviewComponent' },
    canActivate: [AuthGuard]     

  },
  { path: 'Approve', component: ApprovemsgpageComponent },
  { path: 'Reject', component: RejectmsgpageComponent },
  { path: 'Invalid', component: InvalidmsgpageComponent },

  {
  path: 'liv-task-approve-list/:approverId',
  component: LivTaskApproverListComponent,
  canActivate: [AuthGuard]     ,
  data: {
    path: 'liv-task-approve-list/:approverId',
    animation: 'LivTaskApproverListComponent'
  }
},
{ path: 'upload/:id', component: LivDocumentUploadComponent }

]


@NgModule({
  declarations: [CreditLimitReqListComponent,CreditLimitRequestModalComponent, 
    LivPreviewComponent, LivPreviewOverviewSectionComponent
    , LivPreviewDocumentsSectionComponent, 
    LivPreviewOverviewSectionBasicDetailsComponent, LivPreviewTimelineSectionComponent, 
    LivOverviewSectionSummaryComponent, RejectModalComponent, ApproveModalComponent, 
    LivApproveComponent,LivTaskApproverListComponent,LoadListSaleOrApproverComponent, LivDocumentUploadComponent, LivDocumentSectionComponent, ApprovemsgpageComponent, RejectmsgpageComponent, InvalidmsgpageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    CoreCommonModule,
    CoreDirectivesModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,NgSelectModule
  ],
  exports: [CreditLimitReqListComponent,RouterModule]
})
export class LiveformModule { 
  constructor() {
    console.log('LIVFormModule loaded.');
  }
}
