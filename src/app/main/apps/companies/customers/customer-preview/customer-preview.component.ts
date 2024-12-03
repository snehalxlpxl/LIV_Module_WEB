import { Component, OnInit } from '@angular/core';
import { CustomerPreviewService } from '../customer-preview.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { CustomerCreateService } from '../customer-create/customer-create.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-customer-preview',
  templateUrl: './customer-preview.component.html',
  styleUrls: ['./customer-preview.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class CustomerPreviewComponent implements OnInit {

  currentComponent: string;
  customerId: number;
  companydatafromParent: any;
  taxDetails: any[];
  addrDetails: any[];
  contactDetails: any[];
  companyName: any;
  isDropdownReady = false;

  constructor(private navigationService: CustomerPreviewService,
    private activeroute: ActivatedRoute,
    private apiService: CustomerCreateService,
    private location: Location
  ) {}

  ngOnInit() {
    // set component
    this.navigationService.component$.subscribe(component => {
      this.currentComponent = component;
    });

    // param value
      this.activeroute.paramMap.subscribe(params => {
      this.customerId = +params.get('id');
      console.log("customer id in preview",this.customerId);
      if(this.customerId){
       this.loadCustomerData(this.customerId);
       this.getTaxDetail(this.customerId);
       this.getaddrDetail(this.customerId);
       this.getContactDetail(this.customerId);
        
      }
  });

  this.initializeDropdown();
}

  setComponent(component: string) {
    this.navigationService.setComponent(component);
  }

  initializeDropdown() {
    // Simulate async operation or wait for data to load
    setTimeout(() => {
      this.isDropdownReady = true;
    }, 500); // Adjust delay as needed
  }

  loadCustomerData(customerId: number) {
    console.log("preview cust ",customerId);

    this.apiService.getCustomerById(customerId).subscribe((customer: any[]) => {
   
      this.companydatafromParent=customer;
      console.log("this.companydatafromParent",this.companydatafromParent)
      this.companyName=this.companydatafromParent.companyName;
      console.log("preview data by id", this.companydatafromParent);

       
    });
  }
  getTaxDetail(id:number){
    this.apiService.getCustTaxDetailById(id).subscribe((data: any[]) => {
      this.taxDetails=data;
      console.log("gst length", data);
      
    });
  }
  getaddrDetail(id:number){
    this.apiService.getCustAddressById(id).subscribe((data: any[]) => {
      this.addrDetails=data;
      console.log("addr ", this.addrDetails);
   
    });
  }
  getContactDetail(id:number){
    this.apiService.getCustContactById(id).subscribe((data: any[]) => {
      this.contactDetails=data;
      console.log("Contact ", this.contactDetails);
    });
  }
  cancelPreview(){
    this.location.back();
  }
}
