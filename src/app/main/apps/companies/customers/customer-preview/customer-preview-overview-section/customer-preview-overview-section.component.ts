import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-customer-preview-overview-section',
  templateUrl: './customer-preview-overview-section.component.html',
  styleUrls: ['./customer-preview-overview-section.component.scss']
})


export class CustomerPreviewOverviewSectionComponent implements OnInit {
  public contentHeader: object;
  gstDetail: any;
  basicDetail:any;
  addrDetail: any[];
  contactDetail: any;
  
  @Input() set customerData(data: any) {
    this.basicDetail = data;
    console.log('Customer data:', data);
  }

  @Input() set gstData(data: any) {
    this.gstDetail = data;
    console.log('+++++++Customer data:', data);
  }
 
  @Input() set addrData(data: any[]) {
    this.addrDetail = data;
    console.log('********addr data:', data);
  }

  @Input() set contactData(data: any) {
    this.contactDetail = data;
    console.log('********contact data:', data);
  }

  constructor() { }

  ngOnInit(): void {
   
  }


}
