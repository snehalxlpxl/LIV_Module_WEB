import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as snippet from 'app/main/apps/companies/customers/customer-preview/cust.snippetcode';
import { LeadPreviewService } from 'app/Leads/lead-preview.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { NewRateRequestModalComponent } from './new-rate-request-modal/new-rate-request-modal.component';
import { OpenRateRequestRevisionModalComponent } from './open-rate-request-revision-modal/open-rate-request-revision-modal.component';
import { EquiryPreviewBasicDetailService } from './enquiry-preview-overview-section/enquiry-preview-basic-detail/equiry-preview-basic-detail.service';
import { RequiredEquipmentModalService } from '../enquire-create/required-equipment-modal/required-equipment-modal.service';
import { PakageDetailModalService } from '../enquire-create/package-detail-modal/pakage-detail-modal.service';
import { EnquiryAddressModalService } from '../enquire-create/enquiry-address-modal/enquiry-address-modal.service';

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
  // enquiryRows = [
  //   { enquiryId: '250084', customerName: 'Global Motors', industry: 'Automobile Parts', serviceType: 'FCL - Export', requirement: '4 X 40HC', status: 'Awaiting Rates' },
  //   { enquiryId: '250085', customerName: 'Classic Marbles', industry: 'Marbles & Stones', serviceType: 'FCL - Import', requirement: '4 X 40HC', status: 'Closed' },
  //   { enquiryId: '250086', customerName: 'Budweiser Beverages', industry: 'Beverages & Alcohol', serviceType: 'Air - Export', requirement: '1740 KGS', status: 'Quotation Sent' },
  //   // Add more data as required
  // ];

  currentEnquiry: any = null; // Initialize as null
  message = "Enquiry Overview"; // Example message
  currentComponent: string = 'overview'; // Default tab (overview)
  enquiryId: any;
  isDropdownReady = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal,
    private navigationService: LeadPreviewService,
    private servBasicPreview:EquiryPreviewBasicDetailService,
    private requiredEquipmentModalService:RequiredEquipmentModalService,
    private pakageDetailModalService:PakageDetailModalService,
    private enquiryAddressModalService:EnquiryAddressModalService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.enquiryId = params['id'];
      this.getDetalByVIew(this.enquiryId);
    });
    // Get the 'enquiryId' from the route parameters
    // const enquiryId = this.route.snapshot.paramMap.get('id');

    // Find the matching enquiry from the enquiryRows array
    // if (enquiryId) {
    //   this.currentEnquiry = this.enquiryRows.find(enquiry => enquiry.enquiryId === enquiryId);
    //   console.log("Current Enquiry", this.currentEnquiry);
    // }

    if (!this.currentEnquiry) {
      // Handle the case where the enquiry is not found (optional)
      this.message = "Enquiry not found!";
    }
    this.navigationService.component$.subscribe(component => {
      this.currentComponent = component;
    });
    this.initializeDropdown();
  }

  initializeDropdown() {
    // Simulate async operation or wait for data to load
    setTimeout(() => {
      this.isDropdownReady = true;
    }, 500); // Adjust delay as needed
  }

  goBack(): void {
    this.location.back(); // Go back to the previous page
  }

  setComponent(component: string): void {
    this.navigationService.setComponent(component);
  }

  basicDtail:any[];
  getDetalByVIew(id:number){
    this.servBasicPreview.getDetalByVIew(id).subscribe((data: any[]) => {
      this.basicDtail=data;
      console.log("basic Details ", this.basicDtail);
    });
  }

  openNewRateRequestModal(enquiryId:number): void {
    const modalRef = this.modalService.open(NewRateRequestModalComponent);
    modalRef.componentInstance.enquiryID=enquiryId;
  }
  openRateRequestRevisionModal(): void {
    const modalRef = this.modalService.open(OpenRateRequestRevisionModalComponent);
  }
  resetAllList(){
    this.requiredEquipmentModalService.resetEquipmentList();
    this.pakageDetailModalService.resetPakagesList();
    this.enquiryAddressModalService.resetAddressList();
  }
}

