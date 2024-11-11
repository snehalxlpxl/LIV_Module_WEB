import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import * as snippet1 from 'app/main/apps/companies/customers/customer-preview/customer-preview-overview-section/customer-preview-overview-contact /customer-preview-overview-contacts.snippetcode';
import { ToastrService } from 'ngx-toastr';
import { AddCustContactModalComponent } from '../../../customer-create/add-cust-contact-modal/add-cust-contact-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-preview-overview-contacts',
  templateUrl: './customer-preview-overview-contacts.component.html',
  styleUrls: ['./customer-preview-overview-contacts.component.scss']
})
export class CustomerPreviewOverviewContactsComponent implements OnInit {

  // public
  public contentHeader: object;
  contactDetail: any;
  blankvalue="";
  activePanelId2: string;
  customerId: number;

  @Input() set contactData(data: any) {
    this.contactDetail = data;
    console.log('++++++++contact data:', data);
  }
  constructor(private toastr: ToastrService,private modalService: NgbModal,private activeroute: ActivatedRoute){
    
  }
  /**
   * On init
   */
  ngOnInit(): void {
   console.log('CustomerPreviewOverviewContactComponent initialized');
    // content header
    this.activeroute.paramMap.subscribe(params => {
      this.customerId = +params.get('id');
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
  openContactForm(id:any) {
    const modalRef = this.modalService.open(AddCustContactModalComponent);
    modalRef.componentInstance.companyId = id;
    modalRef.componentInstance.isPreview = true;

    this.activePanelId2 = 'panelBorderBottom2';
    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }

 
  openContatFormlByData(data:any)
  {
    const modalRef = this.modalService.open(AddCustContactModalComponent, { size: 'lg' });
    this.activePanelId2 = 'panelBorderBottom2';
    // Pass data to the modal component
    modalRef.componentInstance.contactData = data;
    
    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed');
      window.location.reload();
    });

  }
}
