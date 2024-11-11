import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddCustAddrModalComponent } from '../../../customer-create/add-cust-addr-modal/add-cust-addr-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-preview-overview-address',
  templateUrl: './customer-preview-overview-address.component.html',
  styleUrls: ['./customer-preview-overview-address.component.scss']
})
export class CustomerPreviewOverviewAddressComponent implements OnInit {
  addrDetail: any[];
  blankvalue="";
  activePanelId1: string;
  isAccordionExpanded: boolean;


  @Input() set addrData(data: any[]) {
    this.addrDetail = data;
    console.log('********addr data:', data);
  }


 constructor(private toastr: ToastrService,private modalService: NgbModal,private activeroute: ActivatedRoute) {}


 ngOnInit(): void {
  this.activeroute.paramMap.subscribe(params => {
    this.customerIdfromPreview = +params.get('id');
  // this.customerIdfromPreview
 });
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

isPreview:boolean=false;
customerIdfromPreview:any;
openAddressForm() {
  
  const modalRef = this.modalService.open(AddCustAddrModalComponent);
  this.activePanelId1 = 'panelBorderBottom1';
  modalRef.componentInstance.isPreview=true;
  modalRef.componentInstance.customerIdfromPreview=this.customerIdfromPreview;

  modalRef.result.then(
    (result) => {
      console.log('Modal closed with result:', result);
    },
    (reason) => {
      console.log('Modal dismissed with reason:', reason);
    }
  );
}
openAddressFormlByData(data:any)
{
  const modalRef = this.modalService.open(AddCustAddrModalComponent, { size: 'lg' });
  this.isAccordionExpanded = true;
  this.activePanelId1 = 'panelBorderBottom1';
  // Pass data to the modal component
  modalRef.componentInstance.addressData = data;

  modalRef.result.then((result) => {
    console.log('Modal closed with result:', result);
  }, (reason) => {
    console.log('Modal dismissed');
    window.location.reload();
  });

}



}
