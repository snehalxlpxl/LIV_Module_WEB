import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as snippet from 'app/main/apps/companies/customers/customer-preview/cust.snippetcode';
import { LeadPreviewService } from 'app/Leads/lead-preview.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-enquiry-preview',
  templateUrl: './enquiry-preview.component.html',
  styleUrls: ['./enquiry-preview.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class EnquiryPreviewComponent implements OnInit {
  enquiryRows = [
    { enquiryId: '250084', customerName: 'Global Motors', industry: 'Automobile Parts', serviceType: 'FCL - Export', requirement: '4 X 40HC', status: 'Awaiting Rates' },
    { enquiryId: '250085', customerName: 'Classic Marbles', industry: 'Marbles & Stones', serviceType: 'FCL - Import', requirement: '4 X 40HC', status: 'Closed' },
    { enquiryId: '250086', customerName: 'Budweiser Beverages', industry: 'Beverages & Alcohol', serviceType: 'Air - Export', requirement: '1740 KGS', status: 'Quotation Sent' },
    // Add more data as required
  ];
  
  currentEnquiry: any = null; // Initialize as null
  message = "Enquiry Overview"; // Example message
  currentComponent: string = 'overview'; // Default tab (overview)

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal,
    private navigationService: LeadPreviewService
  ) { }

  ngOnInit(): void {
      // Get the 'enquiryId' from the route parameters
      const enquiryId = this.route.snapshot.paramMap.get('id');

      // Find the matching enquiry from the enquiryRows array
      if (enquiryId) {
        this.currentEnquiry = this.enquiryRows.find(enquiry => enquiry.enquiryId === enquiryId);
        console.log("Current Enquiry",this.currentEnquiry);
      }
  
      if (!this.currentEnquiry) {
        // Handle the case where the enquiry is not found (optional)
        this.message = "Enquiry not found!";
      }
      this.navigationService.component$.subscribe(component => {
        this.currentComponent = component;
      });
  }

  goBack(): void {
    this.location.back(); // Go back to the previous page
  }

  setComponent(component: string): void {
    this.navigationService.setComponent(component);
  }
}

