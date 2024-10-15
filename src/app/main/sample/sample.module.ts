import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SampleComponent } from './sample.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'app/auth/helpers'
import { Role } from 'app/auth/models'
import { AuthLoginV2Component } from '../pages/authentication/auth-login-v2/auth-login-v2.component';

const routes = [
  // {
  //   path: '',
  //   component: AuthLoginV2Component,
  // },
  // {
  //   path: 'login',
  //   component: AuthLoginV2Component
  // },
  {
    path: 'sample',
    component: SampleComponent,
    data: { animation: 'sample' },
    canActivate: [AuthGuard]    
      // commented by snehal
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home'},
    canActivate: [AuthGuard]     
    // commented by snehal
  }
];

@NgModule({
  declarations: [SampleComponent, HomeComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
  exports: [SampleComponent, HomeComponent]
})
export class SampleModule { }
