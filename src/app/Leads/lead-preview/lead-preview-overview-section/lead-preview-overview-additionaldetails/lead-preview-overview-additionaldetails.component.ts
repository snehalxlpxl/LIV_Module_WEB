import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Industry, LeadCreateService } from 'app/Leads/lead-create/lead-create.service';

@Component({
  selector: 'app-lead-preview-overview-additionaldetails',
  templateUrl: './lead-preview-overview-additionaldetails.component.html',
  styleUrls: ['./lead-preview-overview-additionaldetails.component.scss']
})
export class LeadPreviewOverviewAdditionaldetailsComponent implements OnInit {
  leadDetails: any;
  leadId: any;
  leadIndustries: any[] = [];
  constructor(
    private leadService: LeadCreateService ,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {  
     this.leadId = this.route.snapshot.paramMap.get('id');
    console.log("additionaldetailsleadId",this.leadId)
    this.fetchLeadDetails();
    this.fetchLeadIndustries();
  }
  fetchLeadDetails(): void {
    this.leadService.getLeadById(this.leadId).subscribe(
      (data) => {
        this.leadDetails = data;
        // Handle the fetched data, such as assigning to variables for display
        console.log("leadDetails",this.leadDetails)
      },
      (error) => {
        // Handle error
        console.error('Error deleting lead:', error);
      }
    );
  }

fetchLeadIndustries(): void {
  this.leadService.getIndustries().subscribe(
    (data) => {
      this.leadIndustries = data;
      console.log("Lead leadIndustries:", this.leadIndustries);
    },
    (error) => {
      // Handle error
      console.error('Error fetching lead leadIndustries:', error);
    }
  );
}

getLeadIndustryName(leadIndustryId: any): string {
  // console.log(this.leadIndustries);
  const leadIndustry = this.leadIndustries.find(Industry => Industry.industryId === leadIndustryId);
  return leadIndustry ? leadIndustry.industryType : 'Unknown'; // Fallback if not found
}
}
