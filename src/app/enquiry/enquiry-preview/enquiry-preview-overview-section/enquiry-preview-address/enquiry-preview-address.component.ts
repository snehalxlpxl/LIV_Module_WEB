import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnquiryPriviewAddressService } from './enquiry-priview-address.service';
import { EnquiryAddressModalComponent } from 'app/enquiry/enquire-create/enquiry-address-modal/enquiry-address-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { id } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-enquiry-preview-address',
  templateUrl: './enquiry-preview-address.component.html',
  styleUrls: ['./enquiry-preview-address.component.scss']
})
export class EnquiryPreviewAddressComponent implements OnInit {
  // enquiryRows = [
  //   { enquiryId: '250084', customerName: 'Global Motors', industry: 'Automobile Parts', serviceType: 'FCL - Export', requirement: '4 X 40HC', status: 'Awaiting Rates' },
  //   { enquiryId: '250085', customerName: 'Classic Marbles', industry: 'Marbles & Stones', serviceType: 'FCL - Import', requirement: '4 X 40HC', status: 'Closed' },
  //   { enquiryId: '250086', customerName: 'Budweiser Beverages', industry: 'Beverages & Alcohol', serviceType: 'Air - Export', requirement: '1740 KGS', status: 'Quotation Sent' },
  //   // Add more data as required
  // ];
  address:'702. Suntech Tower, SV Road, Khar West, Mumbai 400052, India Contact: 9890098900';
  currentEnquiry: any = null; 
  message = "Enquiry Overview"; // Example message
  viewMode: any;
  enquiryId: any;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private enqPreviewAddrSer:EnquiryPriviewAddressService,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
    // this.address = '702. Suntech Tower, SV Road, Khar West, Mumbai 400052, India Contact: 9890098900';

    const enquiryId = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(params => {
      if(params.type=='preview'){
        this.viewMode='preview';
        this.enquiryId=params.id;
      }
    });
    // Find the matching enquiry from the enquiryRows array
    if (enquiryId) {
      this.getaddrDetail(parseInt(enquiryId));
    }

    if (!this.currentEnquiry) {
      // Handle the case where the enquiry is not found (optional)
      this.message = "Enquiry not found!";
    }
    
  }
  
  copyToClipboard(text: string) {
    if (text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.toastr.success('The text has been copied to the clipboard.', 'Copied!');
    } else {
      this.toastr.error('No text to copy.', 'Error');
    }

  }

  enquiryaddrDetailsList: any[];
  getaddrDetail(id:number){
    this.enqPreviewAddrSer.getEnqAddressById(id).subscribe((data: any[]) => {
      this.enquiryaddrDetailsList=data;
      console.log("addr ", this.enquiryaddrDetailsList);
   
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

  openEnquiryAddressesModal(enquiryId:number){
    console.log("EnquiryAddressModalComponent")
    const modalRef = this.modalService.open(EnquiryAddressModalComponent, {
      size: 'md', 
      backdrop: 'static', 
    });
    modalRef.componentInstance.enquiryIdFromUrl = enquiryId;
    modalRef.componentInstance.viewType = this.viewMode;
  }
}
