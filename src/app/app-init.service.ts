import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LeadCreateService } from './Leads/lead-create/lead-create.service';
import { LoaderService } from './global-loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  salesPerson: any[] = [];
  locationMasterData: any;
  countries: any;

  constructor(private leadCreateService: LeadCreateService,
    private loaderService: LoaderService // Inject LoaderService

  ) {}

  // Combined initialization method for API calls -Fetching Multiple Data Sources
  // loadInitialData(): Promise<any> {
  //   this.loaderService.requestStarted();  // Start the loader

  //   return new Promise((resolve, reject) => {
  //     forkJoin({
  //       salesPerson: this.leadCreateService.getVwAllSalesPerson().pipe(catchError(error => of([]))),
  //       locationMasterData: this.leadCreateService.getAllLocationMaster().pipe(catchError(error => of(null))),
  //       countries: this.leadCreateService.getCountries().pipe(catchError(error => of([]))),

  //     }).subscribe({
  //       next: (results) => {
  //         this.salesPerson = results.salesPerson;
  //         this.locationMasterData = results.locationMasterData;
  //         this.countries = results.countries;

  //         console.log("Sales Person", this.salesPerson);
  //         console.log("Location Master Data", this.locationMasterData);
  //         console.log("Countries", this.countries);
  //         this.loaderService.requestEnded();  // Stop the loader

  //         resolve(true);
  //       },
  //       error: (error) => {
  //         console.error('Error loading initial data', error);
  //         this.loaderService.requestEnded();  // Stop the loader even if there's an error

  //         reject(error);
  //       },
  //     });
  //   });
  // }
  private isDataLoaded = false; // Tracks if data is already loaded

loadInitialData(): Promise<any> {
  if (this.isDataLoaded) {
    // If data is already loaded, skip loading again
    console.log('Initial data already loaded.');
    return Promise.resolve(true);
  }

  this.loaderService.requestStarted(); // Start the loader

  return new Promise((resolve, reject) => {
    forkJoin({
      salesPerson: this.leadCreateService.getVwAllSalesPerson().pipe(catchError(error => {
        console.error('Error loading sales person data', error);
        return of([]); // Default value
      })),
      locationMasterData: this.leadCreateService.getAllLocationMaster().pipe(catchError(error => {
        console.error('Error loading location master data', error);
        return of(null); // Default value
      })),
      countries: this.leadCreateService.getCountries().pipe(catchError(error => {
        console.error('Error loading countries data', error);
        return of([]); // Default value
      })),
    }).subscribe({
      next: (results) => {
        // Assign results to class variables
        this.salesPerson = results.salesPerson;
        this.locationMasterData = results.locationMasterData;
        this.countries = results.countries;

        console.log('Sales Person', this.salesPerson);
        console.log('Location Master Data', this.locationMasterData);
        console.log('Countries', this.countries);

        this.isDataLoaded = true; // Mark data as loaded
        this.loaderService.requestEnded(); // Stop the loader
        resolve(true);
      },
      error: (error) => {
        console.error('Error loading initial data', error);
        this.loaderService.requestEnded(); // Stop the loader
        reject(error);
      },
    });
  });
}

}
