import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeadCreateService } from 'app/Leads/lead-create/lead-create.service';

@Component({
  selector: 'app-lead-preview-overview-products',
  templateUrl: './lead-preview-overview-products.component.html',
  styleUrls: ['./lead-preview-overview-products.component.scss']
})
export class LeadPreviewOverviewProductsComponent implements OnInit {

  leadDetails: any;
  leadId: any;
  constructor( 
    private leadService: LeadCreateService ,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log('CustomerPreviewOverviewBasicDetailComponent initialized');

   this.leadId = this.route.snapshot.paramMap.get('id');
   console.log("BasicDetailleadId",this.leadId)
   this.fetchLeadDetails();
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
}
