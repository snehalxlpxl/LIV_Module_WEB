import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LivPreviewService } from '../liv-preview/liv-preview.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivityNotificationService } from 'app/Leads/lead-preview/lead-preview-activities-section/ActivityNotificationService.service';

@Component({
  selector: 'app-liv-preview-overview-section',
  templateUrl: './liv-preview-overview-section.component.html',
  styleUrls: ['./liv-preview-overview-section.component.scss']
})
export class LivPreviewOverviewSectionComponent implements OnInit {
  requestedDate:any;
  LIVRequestId: any | null = null;
  LIVRequestNumber:any
  livRequestData: any;
  sumOfRealizedRevenueLast60Days: any;
  realizedRevenue: any;
  totalSales: any;
  customerId: any;
  mainTitle: string = '';
  subTitle: string = '';
  taskTimeLineData: any;
  finalStatus: string='';

  constructor(
    private route: ActivatedRoute,
    private livPreviewService: LivPreviewService,
    private http: HttpClient,private activityNotificationService: ActivityNotificationService
  ) { }

  ngOnInit(): void {
    this.LIVRequestNumber = this.route.snapshot.paramMap.get('id');
    this.LIVRequestId=Number(this.LIVRequestNumber);
    console.log("BasicDetailLIVRequestId-", this.LIVRequestId);
    this.activityNotificationService.activity$.subscribe((message: string) => {
      console.log("activityNotificationService Call;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;",message)
      if (message) {
        // this.loadLIVRequests(); // Method to refresh the list or data
        this.getAllData(this.LIVRequestId);
        
      }

    });
    if (this.LIVRequestId) {
      this.getAllData(this.LIVRequestId);
      // // Step 1: Retrieve livRequestData to get companyId
      // this.livPreviewService.getLivrequestById(this.LIVRequestId).subscribe({
      //   next: (livRequestData) => {
      //     this.livRequestData = livRequestData;
      //     console.log( "+++++++++++++++++++++++++++++++",this.livRequestData);
      //     this.customerId = livRequestData.customerId;  // Extract companyId
      //     this.getAllData(this.LIVRequestId, this.customerId); // Proceed to call getAllData
      //   },
      //   error: (error) => console.error('Error fetching livRequestData:', error)
      // });
    }
  }
  getAllData(LIVRequestId: any): void {
    console.log("BasicDetailgetAllDataLIVRequestId---------------", this.LIVRequestId);

    const livRequest$ = this.livPreviewService.getLivrequestById(LIVRequestId);
    
    // const livRequest$ = this.livPreviewService.getLIVRequest(LIVRequestId);
    const taskTimeLine$ = this.getLivTaskTimeLine(LIVRequestId);
    // const sumRevenue$ = this.livPreviewService.getSumOfRealizedRevenueLast60Days(this.customerId);
    // const realizedRevenue$ = this.livPreviewService.getSumRealizedRevenue(this.customerId);
    // const companyCount$ = this.livPreviewService.getCountByCompany(this.customerId);
  
    forkJoin([livRequest$, taskTimeLine$
      // , sumRevenue$, realizedRevenue$, companyCount$
    ])
      .subscribe({
        next: ([livRequestData,taskTimeLineData
          // , sumRevenueData, realizedRevenueData, companyCountData
          ]) => {
          this.livRequestData = livRequestData;
          // this.taskTimeLineData = taskTimeLineData; 
          this.taskTimeLineData = taskTimeLineData

          // this.sumOfRealizedRevenueLast60Days = sumRevenueData;
          // this.realizedRevenue = realizedRevenueData;
          // this.totalSales = companyCountData;
  
          console.log('Fetched LivRequest Data:', this.livRequestData);
          this.finalStatus = this.livRequestData.status;
          console.log('Processed Task TimeLine Data: ____&&&&&&&&&&&&&&&&&&&', taskTimeLineData);
          // console.log('Fetched Revenue Data:==============', sumRevenueData);
          // console.log('Fetched Realized Revenue Data:=================', realizedRevenueData);
          // console.log('Fetched Company Count:=================', companyCountData);
  
          if (this.sumOfRealizedRevenueLast60Days) {
            this.extractTitleAndSubtitle(this.sumOfRealizedRevenueLast60Days.title);
          }
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }
  getLivTaskTimeLine(taskId: number) {
    const url = `${environment.apiUrl}/LIVTimeLine/GetLivTaskTimeLine/${taskId}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }



  extractTitleAndSubtitle(title: string) {
    const parts = title.split(" for the ");
    this.mainTitle = parts[0]; // "Sum of Realized Revenue"
    this.subTitle = parts[1] || ''; // "Last 60 Days", or empty if not found
  }


  handleError(error: any) {
    console.error('Error:', error);
    return [];
  }
}



// Function to process approval status
// private processApprovalStatus(taskTimeLineData: any[]): any[] {
//   // Explicitly define the accumulator type as a Record<number, any[]>
//   const groupedByLevel: Record<number, any[]> = taskTimeLineData.reduce((acc, curr) => {
//     if (!acc[curr.level]) {
//       acc[curr.level] = [];
//     }
//     acc[curr.level].push(curr);
//     return acc;
//   }, {} as Record<number, any[]>);

//   // Process each level and flatten the result without using .flat()
//   return Object.values(groupedByLevel).reduce((result, levelEntries) => {
//     const approvedEntry = levelEntries.find(entry => entry.levelStatus === 'Approved');

//     if (approvedEntry) {
//       // If an approval exists, add only the approved entry
//       result.push(approvedEntry);
//     } else {
//       // If no approvals, show all as "Awaiting Approval"
//       // result.push(...levelEntries.map(entry => ({
//       //   ...entry,
//       //   levelStatus: 'Awaiting Approval'
//       // })));
//     }

//     return result;
//   }, [] as any[]);
// }