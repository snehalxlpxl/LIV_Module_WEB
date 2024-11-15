import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { PackageDetailModalComponent } from '../enquiry-preview/enquiry-preview-overview-section/package-detail-modal/package-detail-modal.component';

@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})
export class EnquiryListComponent implements OnInit {

  searchValue: string = '';
  selectedOption = 10; 
  public ColumnMode = ColumnMode;
  selectedFilter: string = 'All Filters';
  @ViewChild(DatatableComponent) table: DatatableComponent;

  enquiryRows = [
    { enquiryId: '250084', customerName: 'Global Motors', industry: 'Automobile Parts', serviceType: 'FCL - Export', requirement: '4 X 40HC', status: 'Awaiting Rates' },
    { enquiryId: '250085', customerName: 'Classic Marbles', industry: 'Marbles & Stones', serviceType: 'FCL - Import', requirement: '4 X 40HC', status: 'Closed' },
    { enquiryId: '250086', customerName: 'Budweiser Beverages', industry: 'Beverages & Alcohol', serviceType: 'Air - Export', requirement: '1740 KGS', status: 'Quotation Sent' },
    // Add more data as required
  ];

  tempData = [...this.enquiryRows]; 
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  filterUpdate(event: any) {
    // Implement search/filter functionality here
    const val = event.target.value ? event.target.value.toLowerCase() : '';

    // Temporary array to store the filtered results
    const temp = this.tempData.filter(d => {
        if (this.selectedFilter === 'Customer Name') {
            return d.customerName && d.customerName.toLowerCase().includes(val);
        } else if (this.selectedFilter === 'Service Type') {
            return d.serviceType && d.serviceType.toLowerCase().includes(val);
        } else if (this.selectedFilter === 'Requirement') {
            return d.requirement && d.requirement.toLowerCase().includes(val);
        } else if (this.selectedFilter === 'Status') {
            return d.status && d.status.toLowerCase().includes(val);
        } else if (this.selectedFilter === 'All Filters') {
            return (
                (d.customerName && d.customerName.toLowerCase().includes(val)) ||
                (d.serviceType && d.serviceType.toLowerCase().includes(val)) ||
                (d.requirement && d.requirement.toLowerCase().includes(val)) ||
                (d.status && d.status.toLowerCase().includes(val))
            ) || !val;
        } else {
            // If no specific filter is selected, include all data
            return true;
        }
    });

    // Update the rows being displayed
    this.enquiryRows = temp;

    // Reset the table's offset to show filtered results from the beginning
    this.table.offset = 0;
  }

  deleteEnquiry(enquiryId: string) {
    // Implement delete functionality here
  }

  openPackageDetailModal() {
    console.log("openPackageDetailModal")
    const modalRef = this.modalService.open(PackageDetailModalComponent, {
      size: 'md', // Optional: Specify the size of the modal (lg, md, sm)
      backdrop: 'static', // Optional: Prevent closing the modal by clicking on the backdrop
    });
  }
}
