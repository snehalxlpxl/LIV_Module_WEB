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

  constructor(private livRequestService: LivPreviewService,private leadService: LeadCreateService ,
    private route: ActivatedRoute,  ) { }

  ngOnInit(): void {

   this.LIVRequestId = this.route.snapshot.paramMap.get('id');
   console.log("BasicDetailLIVRequestId",this.LIVRequestId);
  
    this.getLIVRequest(this.LIVRequestId);
  }
  getLIVRequest(id: any): void {
    this.livRequestService.getLIVRequest(id).subscribe({
      next: (data) => {
        this.livRequest = data;
        console.log("GetLIVRequest",data); 
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
        this.salesPersonName = ownerData.userName; // Assuming the API returns the owner's name
        // console.log(ownerData);
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
