import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-preview-overview-address',
  templateUrl: './customer-preview-overview-address.component.html',
  styleUrls: ['./customer-preview-overview-address.component.scss']
})
export class CustomerPreviewOverviewAddressComponent implements OnInit {
  addrDetail: any[];
  blankvalue="";

  @Input() set addrData(data: any[]) {
    this.addrDetail = data;
    console.log('********addr data:', data);
  }


 constructor(private toastr: ToastrService) {}


 ngOnInit(): void {
  
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
