import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreSidebarModule } from '@core/components';
import { LeadsListComponent } from './leads-list/leads-list.component';
import { LeadsListService } from './leads-list/leads-list.service';
import { LeadPreviewService } from './lead-preview.service';
import { LeadPreviewComponent } from './lead-preview/lead-preview.component';
import { LeadPreviewHeaderComponent } from './lead-preview/lead-preview-header/lead-preview-header.component';
import { LeadPreviewModule } from './lead-preview/lead-preview.module';
import { LeadCreateComponent } from './lead-create/lead-create.component';
import { LeadCreateModule } from './lead-create/lead-create.module';

const routes = [
  {
    path: 'leadsList',
    component: LeadsListComponent,
    resolve: {
      data: LeadsListService
    },
    data: { path: 'user-view/:id', animation: 'LeadsListComponent' }
  },
  {
    path: 'lead/preview/:id',
    component: LeadPreviewComponent,
    data: { path: 'user-view/:id', animation: 'LeadsListComponent' }
  },
];

@NgModule({
  declarations: [
    LeadsListComponent
    // LeadCreateComponent,
    //  LeadPreviewComponent,  
    //  LeadPreviewHeaderComponent
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
    LeadPreviewModule,
    LeadCreateModule
  ],
  providers: [LeadsListService, LeadPreviewService],
  exports: [LeadsListComponent, RouterModule]
})
export class LeadsModule {
  constructor() {
    console.log('LeadsModule loaded.');
  }
}
