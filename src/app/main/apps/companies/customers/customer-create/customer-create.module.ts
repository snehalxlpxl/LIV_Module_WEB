import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCreateComponent } from './customer-create.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddCustAddrModalComponent } from './add-cust-addr-modal/add-cust-addr-modal.component';
import { AddCustContactModalComponent } from './add-cust-contact-modal/add-cust-contact-modal.component';
import { AddCustGstDetailsComponent } from './add-cust-gst-details/add-cust-gst-details.component';
const routes = [
  {
    path: 'customer/create',
    component: CustomerCreateComponent
  },
  {
    path: 'customer/edit/:id',
    component: CustomerCreateComponent
  }
]

@NgModule({
    declarations: [
        CustomerCreateComponent,
        AddCustAddrModalComponent,
        AddCustContactModalComponent,
        AddCustGstDetailsComponent
    ],
    exports: [CustomerCreateComponent, RouterModule],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        // CustomerCreateBasicDetailModule,
        // CustomerCreateAddressModule,
        // CustomerCreateContactModule,
        // CustomerCreateAccountingInfoModule,
        // CustomerCreateTaxdetailModule,
        NgbModule, 
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
    ]
})
export class CustomerCreateModule { }
