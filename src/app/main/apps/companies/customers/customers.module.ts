import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreSidebarModule } from '@core/components';
import { CustomerListService } from './customer-list/customer-list.service';
import { CustomerPreviewService } from './customer-preview.service';
import { CustomerPreviewComponent } from './customer-preview/customer-preview.component';
import { CustomerPreviewShipmentSectionComponent } from './customer-preview/cutomer-preview-shipment-section/customer-preview-shipment-section.component';
import { CustomerPreviewModule } from './customer-preview/customer-preview.module';
import { CustomerCreateModule } from './customer-create/customer-create.module';
import { Ellipsis1Pipe } from './customer-list/ellipsis1.pipe';



const routes = [

  {
    path: 'customerList',
    component: CustomerListComponent,
    data: { path: 'customerList', animation: 'CustomerListComponent' }
  },
  {
    path: 'customer/preview/:id',
    component: CustomerPreviewComponent,
    data: { path: 'user-view/:id', animation: 'CustomerPreviewComponent' }
  },
  {
    path: 'customer/preview/:id/shipment',
    component: CustomerPreviewShipmentSectionComponent,
    // resolve: {
    //   data: CustomerPreviewService
    // },
    data: { path: 'user-view/:id', animation: 'CustomerPreviewShipmentSectionComponent' }
  },
];

@NgModule({
  declarations: [CustomerListComponent, Ellipsis1Pipe],
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
    CustomerPreviewModule,
    CustomerCreateModule
  ],
  providers: [CustomerListService,CustomerPreviewService] ,
  exports: [CustomerListComponent,RouterModule]
})

export class CustomersModule { 
  constructor() {
    console.log('CustomersModule loaded.');
  }
}
