import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lead } from 'app/Leads/lead-create/lead-create-model/Lead';
import { LeadCreateService } from 'app/Leads/lead-create/lead-create.service';

@Component({
  selector: 'app-lead-preview-overview-section',
  templateUrl: './lead-preview-overview-section.component.html',
  styleUrls: ['./lead-preview-overview-section.component.scss']
})
export class LeadPreviewOverviewSectionComponent implements OnInit {
  leadId:any;
  leadDetails: Lead | undefined;
  billingAddress: any;

  constructor(private route: ActivatedRoute,private leadCreateService: LeadCreateService) { }

  ngOnInit(): void {
 
    const leadId = this.route.snapshot.paramMap.get('id');
    console.log("leadId",leadId);
    const leadIdNumber = Number(leadId);
    this.leadCreateService.getLeadDetails(leadIdNumber).subscribe({
      next: (data) => {
        this.leadDetails = data;
        this.formatAddress();
      },
      error: (err) => {
        console.error('Error fetching lead details:', err);
      }
    });
  }
  formatAddress(): void {
    this.billingAddress = `${this.leadDetails.street}, ${this.leadDetails.cityName}, ${this.leadDetails.stateName}, ${this.leadDetails.countryName}, ${this.leadDetails.zipCode} Contact: ${this.leadDetails.phone1}`;
    console.log('Formatted Address:', this.billingAddress);
  }

}
