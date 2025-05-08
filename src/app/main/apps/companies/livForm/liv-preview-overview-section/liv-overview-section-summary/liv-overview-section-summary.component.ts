import { Component, Input, OnInit } from '@angular/core';
import { LivPreviewService } from '../../liv-preview/liv-preview.service';
import { ActivatedRoute } from '@angular/router';
import feather from 'feather-icons';
import { forkJoin, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-liv-overview-section-summary',
  templateUrl: './liv-overview-section-summary.component.html',
  styleUrls: ['./liv-overview-section-summary.component.scss']
})
export class LivOverviewSectionSummaryComponent implements OnInit {
  @Input() sumOfRealizedRevenueLast60Days: any;
  @Input() realizedRevenue: any;
  @Input() totalSales: any;
  shipmentCountByCompanyLast60Days:any
  livRequest: any;
  customerId: any;
  LIVRequestId: any;
  // totalSales: any | undefined;
  // realizedRevenue: any | undefined;
  // sumOfRealizedRevenueLast60Days: any | undefined;
  mainTitle: string = '';
  subTitle: string = '';
  constructor(private LivPreviewService: LivPreviewService,  private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.LIVRequestId = this.route.snapshot.paramMap.get('id');
    console.log("BasicDetailLIVRequestId",this.LIVRequestId);
     this.getLIVRequest(this.LIVRequestId);

  }

  
getLIVRequest(id: any): void {
  // First, get the main LIV request data
  this.LivPreviewService.getLIVRequest(id).pipe(
    switchMap((data) => {
      this.livRequest = data;
      console.log("GetLIVRequest ++++++++++++++++", data);
      this.customerId = data.customerId;

      // Use forkJoin to simultaneously call the three other methods with customerId
      return forkJoin({
        companyCount: this.LivPreviewService.getCountByCompany(this.customerId).pipe(
          catchError((error) => {
            console.error('Error fetching company count:', error);
            return of(null); // Return null if there's an error
          })
        ),
        realizedRevenue: this.LivPreviewService.getSumRealizedRevenue(this.customerId).pipe(
          catchError((error) => {
            console.error('Error fetching realized revenue:', error);
            return of(null);
          })
        ),
        sumOfRealizedRevenueLast60Days: this.LivPreviewService.getSumOfRealizedRevenueLast60Days(this.customerId).pipe(
          catchError((error) => {
            console.error('Error fetching sum of realized revenue:', error);
            return of(null);
          })
        ),
        shipmentCountByCompanyLast60Days: this.LivPreviewService.shipmentCountByCompanyLast60Days(this.customerId).pipe(
          catchError((error) => {
            console.error('Error fetching sum of realized revenue:', error);
            return of(null);
          })
        ),
      });
    })
  ).subscribe({
    next: ({ companyCount, realizedRevenue, sumOfRealizedRevenueLast60Days,shipmentCountByCompanyLast60Days }) => {
      this.totalSales = companyCount;
      this.realizedRevenue = realizedRevenue;
      this.sumOfRealizedRevenueLast60Days = sumOfRealizedRevenueLast60Days;
      this.shipmentCountByCompanyLast60Days=shipmentCountByCompanyLast60Days

      // console.log('Fetched Company Count:', this.totalSales);
      // console.log('Fetched Realized Revenue:', this.realizedRevenue);
      // console.log('Fetched Sum of Realized Revenue Last 60 Days:', this.sumOfRealizedRevenueLast60Days);
      // console.log('Fetched shipment Count By Company Last60Days:', this.shipmentCountByCompanyLast60Days);

      // Extract title and subtitle if sumOfRealizedRevenueLast60Days data exists
      if (this.sumOfRealizedRevenueLast60Days) {
        this.extractTitleAndSubtitle(this.sumOfRealizedRevenueLast60Days.title);
      }
    },
    error: (err) => console.error('Error in getLIVRequest:', err)
  });
}
extractTitleAndSubtitle(title: string) {
  // Split the title by " for the " to get parts of the string
  const parts = title.split(" for the ");
  
  // Assuming the main title should be without "Sum of"
  this.mainTitle = parts[0].replace("Sum of ", "");
  
  // Subtitle is the part after " for the "
  this.subTitle = parts[1] || '';
}


ngAfterViewInit() {
  feather.replace();
}
}
