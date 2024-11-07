import { Component, OnInit } from '@angular/core';
import { LivPreviewService } from '../../liv-preview/liv-preview.service';
import { ActivatedRoute } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-liv-overview-section-summary',
  templateUrl: './liv-overview-section-summary.component.html',
  styleUrls: ['./liv-overview-section-summary.component.scss']
})
export class LivOverviewSectionSummaryComponent implements OnInit {
  livRequest: any;
  customerId: any;
  LIVRequestId: any;
  totalSales: any | undefined;
  realizedRevenue: any | undefined;
  sumOfRealizedRevenueLast60Days: any | undefined;
  mainTitle: string = '';
  subTitle: string = '';
  constructor(private LivPreviewService: LivPreviewService,  private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.LIVRequestId = this.route.snapshot.paramMap.get('id');
    console.log("BasicDetailLIVRequestId",this.LIVRequestId);
     this.getLIVRequest(this.LIVRequestId);

  }

  getLIVRequest(id: any): void {
    this.LivPreviewService.getLIVRequest(id).subscribe({
      next: (data) => {
          this.livRequest = data;
          console.log("GetLIVRequest ++++++++++++++++", data);
          this.customerId = data.customerId;
          this.getCompanyCount();
          this.getRealizedRevenue();
          this.getSumOfRealizedRevenueLast60Days();
        
      },
      error: (err) => console.error('Error fetching LIVRequest', err),
    });
  }

  getCompanyCount() {
    this.LivPreviewService.getCountByCompany(this.customerId).subscribe(
      data => this.totalSales = data,
      error => console.error('Error:', error)
    );
  }

  getRealizedRevenue() {
    this.LivPreviewService.getSumRealizedRevenue(this.customerId).subscribe(
      data => this.realizedRevenue = data, 
      error => console.error('Error:', error)
    );
  }
  // getSumOfRealizedRevenueLast60Days() {
  //   this.LivPreviewService.getSumOfRealizedRevenueLast60Days(this.customerId).subscribe(
  //     data => 
  //       this.sumOfRealizedRevenueLast60Days = data,
      
  //     // console.log('Sum of Realized Revenue Last 60 Days:', data),
  //     error => console.error('Error:', error)
  //   );
  // }
  getSumOfRealizedRevenueLast60Days() {
    this.LivPreviewService.getSumOfRealizedRevenueLast60Days(this.customerId).subscribe({
      next: (data) => {
        this.sumOfRealizedRevenueLast60Days = data;
        this.extractTitleAndSubtitle(this.sumOfRealizedRevenueLast60Days.title);
      },
      error: (err) => console.error('Error:', err)
    });
  }
  
  extractTitleAndSubtitle(title: string) {
    const parts = title.split(" for the ");
    this.mainTitle = parts[0]; // "Sum of Realized Revenue"
    this.subTitle = parts[1] || ''; // "Last 60 Days", or empty if not found
  }

ngAfterViewInit() {
  feather.replace();
}
}
