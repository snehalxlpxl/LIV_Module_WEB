import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeadCreateService } from 'app/Leads/lead-create/lead-create.service';
import { LivPreviewService } from '../../liv-preview/liv-preview.service';

@Component({
  selector: 'app-liv-preview-overview-section-basic-details',
  templateUrl: './liv-preview-overview-section-basic-details.component.html',
  styleUrls: ['./liv-preview-overview-section-basic-details.component.scss']
})
export class LivPreviewOverviewSectionBasicDetailsComponent implements OnInit {
  livRequest:any = [];
  LIVRequestId:any;
  salesPersonName:any;
  companyName:any;
  userName: any;
  userId: any;

  constructor(private livRequestService: LivPreviewService,private leadService: LeadCreateService ,
    private route: ActivatedRoute,  ) { }

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
   console.log("BasicDetailLIVRequestId",this.LIVRequestId);
  
    this.getLIVRequest(this.LIVRequestId);
    // this.isApprover = this.approverList.includes(this.userId);
  }

  // isApprover : boolean=false;
  // approverList = [113057, 113058, 113059, 113060, 113061, 113062];
  getLIVRequest(id: any): void {
    this.livRequestService.getLIVRequest(id).subscribe({
      next: (data) => {
        // if (this.isApprover || data.createdBy == this.userId) {
          this.livRequest = data;
          console.log("GetLIVRequest ++++++++++++++++", data);
      // } else {
      //     console.log('No matching LIV request found for createdBy:', this.userId);
      // }
        // console.log(this.livRequest.salesPersonId);
        this.fetchSalesPersonName(this.livRequest.salesPersonId);
        this.fetchBranchName(this.livRequest.branchId)
      },
      error: (err) => console.error('Error fetching LIVRequest', err),
    });
  }
  fetchSalesPersonName(leadOwnerId: string): void {
    // console.log("leadOwnerId:",leadOwnerId)
    this.leadService.getLeadOwner(leadOwnerId).subscribe(
      (ownerData) => {
        this.salesPersonName = ownerData.userDisplayName; // Assuming the API returns the owner's name
        console.log("ownerData",ownerData);
      },
      (error) => {
        console.error('Error deleting lead:', error);
      }
    );
  }

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
}
