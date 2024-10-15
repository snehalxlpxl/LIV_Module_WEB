import { Component, Input, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import * as snippet1 from 'app/main/apps/companies/customers/customer-preview/customer-preview-overview-section/customer-preview-overview-basic-detail/customer-preview-overview-basic-detail-snippetcode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-preview-overview-basic-detail',
  templateUrl: './customer-preview-overview-basic-detail.component.html',
  styleUrls: ['./customer-preview-overview-basic-detail.component.scss']
})
export class CustomerPreviewOverviewBasicDetailComponent implements OnInit {
  basicDetail: any;
  gstDetail: any;
  blankvalue="";

  @Input() set customerBAsicData(data: any) {
    this.basicDetail = data;
    console.log('Customer Basic data:', data);
  }

  @Input() set gstData(data: any) {
    this.gstDetail = data;
    console.log('********GST data:', data);
  }

 constructor(private toastr: ToastrService) {}

 /**
  * On init
  */
 ngOnInit(): void {
  console.log('CustomerPreviewOverviewBasicDetailComponent initialized');
  //  // content header
  //  console.log("data i child",this.customerData);
  
 }
 copyAddress(event: MouseEvent, detail: any) {
  event.stopPropagation(); // Prevents the row click event from being triggered
  const address = `${detail.company|| detail.companyName}, ${detail.addressLine1}, ${detail.addressLine2}, ${detail.city||detail.cityName}-${detail.zipCode|| detail.zipcode}, ${detail.country}, ${detail.state ||detail.stateName}`;
  navigator.clipboard.writeText(address).then(() => {
    this.toastr.success('Copied to clipboard!', 'Copied', {
      timeOut: 2000 // Hide the message after 2 seconds
    });
  }).catch((error) => {
    console.error('Error copying address to clipboard:', error);
    this.toastr.error('Error copying address to clipboard', 'Error');
  });
}

}
