import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import {  AuthGuard, ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from 'app/auth/helpers'

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { CustomersModule } from './main/apps/companies/customers/customers.module';
import { LoaderComponent } from './global-loader/loader.component';
import { LoaderInterceptor } from './global-loader/loader.interceptor';
import { CapitalizePipe } from './capitalize.pipe';
import { LeadsModule } from './Leads/leads.module';
import { LiveformModule } from './main/apps/companies/livForm/liveform.module';


const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    redirectTo: '/credit-limit-req-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  },
  {
    path: 'companies',
    loadChildren: () => import('./main/apps/companies/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'Livform',
    loadChildren: () => import('./main/apps/companies/livForm/liveform.module').then(m => m.LiveformModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'leads',
    loadChildren: () => import('./Leads/leads.module').then(m => m.LeadsModule),
    canActivate: [AuthGuard] 

  }
];

@NgModule({
  declarations: [AppComponent, LoaderComponent, CapitalizePipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    // App modules
    LayoutModule,
    SampleModule,
    CustomersModule,
    LeadsModule,
    LiveformModule,
    
    
  ],
  providers: [
    {
       provide: HTTP_INTERCEPTORS,
       useClass: LoaderInterceptor,
       multi: true,
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
