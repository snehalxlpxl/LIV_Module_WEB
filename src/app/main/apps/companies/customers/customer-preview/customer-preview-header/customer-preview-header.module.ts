import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPreviewHeaderComponent } from './customer-preview-header.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


const routes: Routes = [
  {
    path: 'customer/preview/header',
    component: CustomerPreviewHeaderComponent,
    data: { animation: 'layout' }
  }
];
@NgModule({
  declarations: [CustomerPreviewHeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule, ContentHeaderModule
  ],
  exports:[CustomerPreviewHeaderComponent]
})
export class CustomerPreviewHeaderModule { }
