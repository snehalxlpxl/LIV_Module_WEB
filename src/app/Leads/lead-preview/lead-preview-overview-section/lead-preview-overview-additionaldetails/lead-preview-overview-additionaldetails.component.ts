import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lead } from 'app/Leads/lead-create/lead-create-model/Lead';
import { Industry, LeadCreateService } from 'app/Leads/lead-create/lead-create.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lead-preview-overview-additionaldetails',
  templateUrl: './lead-preview-overview-additionaldetails.component.html',
  styleUrls: ['./lead-preview-overview-additionaldetails.component.scss']
})
export class LeadPreviewOverviewAdditionaldetailsComponent implements OnInit {
  @Input() lead: Lead | undefined;
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
   
  }


}
