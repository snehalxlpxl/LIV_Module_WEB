import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LeadCreateComponent } from './lead-create.component';
const routes = [
  {
    path: 'lead/create',
    component: LeadCreateComponent
  },
  { path: 'lead/create/:id', component: LeadCreateComponent }, // For editing an existing lead

]

@NgModule({
    declarations: [
        LeadCreateComponent
    ],
    exports: [LeadCreateComponent, RouterModule],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgbModule, 
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
    ]
})
export class LeadCreateModule { }
