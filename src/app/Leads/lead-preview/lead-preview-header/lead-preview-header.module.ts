import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { LeadPreviewHeaderComponent } from './lead-preview-header.component';
import { CallLogModalComponent } from './call-log-modal/call-log-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDetailModalComponent } from './task-detail-modal/task-detail-modal.component';
import { MeetingInformationModalComponent } from './meeting-information-modal/meeting-information-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';


const routes: Routes = [
  {
    path: 'lead/preview/header',
    component: LeadPreviewHeaderComponent,
    data: { animation: 'layout' }
  },
  { path: 'task-detail/:id', component: TaskDetailModalComponent }
];
@NgModule({
  declarations: [LeadPreviewHeaderComponent, CallLogModalComponent, TaskDetailModalComponent, MeetingInformationModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule.forChild(routes),
    NgbModule, ContentHeaderModule
  ],
  exports:[LeadPreviewHeaderComponent]
})
export class LeadPreviewHeaderModule { }
