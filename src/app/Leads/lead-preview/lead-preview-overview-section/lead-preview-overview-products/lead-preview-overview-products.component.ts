import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lead } from 'app/Leads/lead-create/lead-create-model/Lead';
import { LeadCreateService } from 'app/Leads/lead-create/lead-create.service';

@Component({
  selector: 'app-lead-preview-overview-products',
  templateUrl: './lead-preview-overview-products.component.html',
  styleUrls: ['./lead-preview-overview-products.component.scss']
})
export class LeadPreviewOverviewProductsComponent implements OnInit {
  @Input() lead: Lead | undefined;

  leadDetails: any;
  leadId: any;
  constructor( 
    private leadService: LeadCreateService ,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log('CustomerPreviewOverviewBasicDetailComponent initialized');
  }
}
