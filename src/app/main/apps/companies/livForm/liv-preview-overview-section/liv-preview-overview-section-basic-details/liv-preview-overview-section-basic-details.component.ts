import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeadCreateService } from 'app/Leads/lead-create/lead-create.service';
import { LivPreviewService, VwLivrequest } from '../../liv-preview/liv-preview.service';

@Component({
  selector: 'app-liv-preview-overview-section-basic-details',
  templateUrl: './liv-preview-overview-section-basic-details.component.html',
  styleUrls: ['./liv-preview-overview-section-basic-details.component.scss']
})
export class LivPreviewOverviewSectionBasicDetailsComponent implements OnInit {
  @Input() livRequestData: any;
  requestedDate: undefined;

  livRequest: any = [];
  LIVRequestId: any;
  salesPersonName: any;
  companyName: any;
  userName: any;
  userId: any;
  // public livRequestData: VwLivrequest | null = null;

  constructor(private livRequestService: LivPreviewService, private leadService: LeadCreateService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
    } else {
      console.log('No user data found in sessionStorage');
    }



    this.LIVRequestId = this.route.snapshot.paramMap.get('id');
    this.getLIVRequest(this.LIVRequestId);
    console.log("BasicDetailLIVRequestId", this.LIVRequestId);
    console.log("BasicDetailsComponent----------------------------------", this.livRequestData)
    //  this.livRequestService.getLivrequestById(this.LIVRequestId).subscribe({
    //   next: (data) => {
    //     this.livRequestData = data;
    //     console.log('Fetched Livrequest Data:+++++++++++++++++', this.livRequestData);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching data:', error);
    //   },
    // });

    // this.getLIVRequest(this.LIVRequestId);
    // this.isApprover = this.approverList.includes(this.userId);
  }

  // isApprover : boolean=false;
  // approverList = [113057, 113058, 113059, 113060, 113061, 113062];
  // getLIVRequest(id: any): void {
  //   this.livRequestService.getLIVRequest(id).subscribe({
  //     next: (data) => {
  //       // if (this.isApprover || data.createdBy == this.userId) {
  //         this.livRequest = data;
  //         console.log("GetLIVRequest ++++++++++++++++", data);
  //     // } else {
  //     //     console.log('No matching LIV request found for createdBy:', this.userId);
  //     // }
  //       // console.log(this.livRequest.salesPersonId);
  //       // this.fetchSalesPersonName(this.livRequest.salesPersonId);
  //       this.fetchBranchName(this.livRequest.branchId)
  //     },
  //     error: (err) => console.error('Error fetching LIVRequest', err),
  //   });
  // }
  // fetchSalesPersonName(leadOwnerId: string): void {
  //   // console.log("leadOwnerId:",leadOwnerId)
  //   this.leadService.getLeadOwner(leadOwnerId).subscribe(
  //     (ownerData) => {
  //       this.salesPersonName = ownerData.userDisplayName; // Assuming the API returns the owner's name
  //       console.log("ownerData",ownerData);
  //     },
  //     (error) => {
  //       console.error('Error deleting lead:', error);
  //     }
  //   );
  // }

  fetchBranchName(branchId: string): void {
    // console.log("leadOwnerId:",leadOwnerId)
    this.livRequestService.getBranchName(branchId).subscribe(
      (data) => {
        this.companyName = data.companyName; // Assuming the API returns the owner's name
        // console.log(data);
      },
      (error) => {
        console.error('Error deleting lead:', error);
      }
    );
  }

  getLIVRequest(id: any): void {
    // this.isApprover = this.approverList.includes(this.userId);
    this.livRequestService.getLIVRequest(id).subscribe({
      next: (data) => {
        // if (this.isApprover ) {
        this.livRequest = data;
        console.log("GetLIVRequest1", data);
      }
      ,
      error: (err) => {
        console.error('Error fetching LIVRequest', err);
      },
    });
  }

  // Formats the number with Indian numbering system (with thousand separators)
  formatNumber(value: number): string {
    if (!value) return '';

    let x = value.toString().split('.')[0]; // Handle whole numbers only
    let lastThree = x.substring(x.length - 3); // Get the last three digits
    const otherNumbers = x.substring(0, x.length - 3); // Get the rest of the digits
    if (otherNumbers !== '') lastThree = ',' + lastThree;

    // Format the remaining numbers in pairs of two digits (Indian numbering system)
    const formattedValue =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

    return formattedValue;
  }


}
