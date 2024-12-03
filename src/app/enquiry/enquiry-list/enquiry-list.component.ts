import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { PackageDetailModalComponent } from '../enquire-create/package-detail-modal/package-detail-modal.component';
import { RequiredEquipmentModalComponent } from '../enquire-create/required-equipment-modal/required-equipment-modal.component';
import { EnquiryListService } from './enquiry-list.service';
import Swal from 'sweetalert2';

import { ChangeDetectorRef } from '@angular/core';
import { RequiredEquipmentModalService } from '../enquire-create/required-equipment-modal/required-equipment-modal.service';
import { PakageDetailModalService } from '../enquire-create/package-detail-modal/pakage-detail-modal.service';
import { EnquiryAddressModalService } from '../enquire-create/enquiry-address-modal/enquiry-address-modal.service';

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

  // enquiryRows = [
  //   { enquiryId: '250084', customerName: 'Global Motors', industry: 'Automobile Parts', serviceType: 'FCL - Export', requirement: '4 X 40HC', status: 'Awaiting Rates' },
  //   { enquiryId: '250085', customerName: 'Classic Marbles', industry: 'Marbles & Stones', serviceType: 'FCL - Import', requirement: '4 X 40HC', status: 'Closed' },
  //   { enquiryId: '250086', customerName: 'Budweiser Beverages', industry: 'Beverages & Alcohol', serviceType: 'Air - Export', requirement: '1740 KGS', status: 'Quotation Sent' },
  //   // Add more data as required
  // ];

  // tempData = [...this.enquiryRows]; 
  tempData :any[]=[]; 
  rows: any[];
  constructor(private modalService: NgbModal,private enquiryListSer:EnquiryListService,private cdRef: ChangeDetectorRef,private requiredEquipmentModalService:RequiredEquipmentModalService,
    private pakageDetailModalService:PakageDetailModalService,private enquiryAddressModalService:EnquiryAddressModalService
  ) { }

  ngOnInit(): void {
    this.loadEnquiries();

    

  }

  // filterUpdate(event: any) {
  //   // Implement search/filter functionality here
  //   const val = event.target.value ? event.target.value.toLowerCase() : '';

  //   // Temporary array to store the filtered results
  //   const temp = this.tempData.filter(d => {
  //       if (this.selectedFilter === 'Customer Name') {
  //           return d.customerName && d.customerName.toLowerCase().includes(val);
  //       } else if (this.selectedFilter === 'Service Type') {
  //           return d.serviceType && d.serviceType.toLowerCase().includes(val);
  //       } else if (this.selectedFilter === 'Requirement') {
  //           return d.requirement && d.requirement.toLowerCase().includes(val);
  //       } else if (this.selectedFilter === 'Status') {
  //           return d.status && d.status.toLowerCase().includes(val);
  //       } else if (this.selectedFilter === 'All Filters') {
  //           return (
  //               (d.customerName && d.customerName.toLowerCase().includes(val)) ||
  //               (d.serviceType && d.serviceType.toLowerCase().includes(val)) ||
  //               (d.requirement && d.requirement.toLowerCase().includes(val)) ||
  //               (d.status && d.status.toLowerCase().includes(val))
  //           ) || !val;
  //       } else {
  //           // If no specific filter is selected, include all data
  //           return true;
  //       }
  //   });

    // Update the rows being displayed
  //   this.enquiryRows = temp;

  //   // Reset the table's offset to show filtered results from the beginning
  //   this.table.offset = 0;
  // }

  deleteEnquiry(enquiryId: string) {
    // Implement delete functionality here
  }

  onPage(event: any) {
    this.pageNumber = event.page + 1;
    this.loadEnquiries();
  }
  enquiries:any[]=[]
  totalRecords: number = 0;
  totalRecords2: any[]=[]
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pages: number[] = [];
  filteredData: any[] = [];
  

  loadEnquiries() {
    // this.loading = true;
    this.enquiryListSer.getEnquiryList(this.pageNumber, this.pageSize).subscribe(response => {
      this.enquiries = response.enquires;
      this.totalRecords = response.totalRecords;
      this.tempData = response.enquires;
      // Initialize filtered data
      this.filteredData = [...this.enquiries];
      
      console.log("all enquiries",this.filteredData)

      // Calculate the total number of pages
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

      // Update pagination and page data
      // this.updatePagination();
      // this.updatePageData();
      

      // this.loading = false;
    }, error => {
      console.error('Error fetching companies', error);
      // this.loading = false;
    });
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadEnquiries();
      this.updatePageData(); 
      this.updatePagination(); 
    }
  }

  goToPreviousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadEnquiries();
      this.updatePageData(); 
      this.updatePagination(); 
    }
  }

  goToNextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadEnquiries();
      this.updatePageData(); 
      this.updatePagination(); 
    }
  }
  updatePagination() {
    const pagesToShow = 6; // Number of page numbers to show
    let startPage: number, endPage: number;

    if (this.totalPages <= pagesToShow) {
      startPage = 1;
      endPage = this.totalPages;
    } else {
      if (this.pageNumber <= Math.ceil(pagesToShow / 2)) {
        startPage = 1;
        endPage = pagesToShow;
      } else if (this.pageNumber + Math.floor(pagesToShow / 2) >= this.totalPages) {
        startPage = this.totalPages - pagesToShow + 1;
        endPage = this.totalPages;
      } else {
        startPage = this.pageNumber - Math.floor(pagesToShow / 2);
        endPage = this.pageNumber + Math.floor(pagesToShow / 2);
      }
    }

    this.pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
  
  filteredData2: any[] = []; // Data after filtering
  updatePageData() {
    const start = (this.pageNumber - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.rows = this.filteredData.slice(start, end);
  }
  
  filterUpdate(event: any) {
    const val = (event.target.value || "").toLowerCase();
  
    // Make an API call to fetch filtered data from the server
    this.enquiryListSer.getEnquiryList(this.pageNumber, this.pageSize, val).subscribe(
      (response: any) => {
        // Update the table data with the filtered data from the server
        this.enquiries = response.enquires;
        this.totalRecords = response.totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.updatePagination();
  
        // Reset the table to start from the first page
        if (this.table) {
          this.table.offset = 0;
        }
      },
      error => {
        console.error('Error fetching filtered data:', error);
      }
    );
  }
  onDeleteEnquiry(enquiryId: number): void {
    Swal.fire({
      title: 'Delete Enquiry?',
      text: `Are you sure you want to delete Enquiry ${enquiryId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.enquiryListSer.deleteEnquiry(enquiryId).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Enquiry deleted successfully', 'success');
            this.refreshEnquiryList();
            this.cdRef.detectChanges(); // Trigger change detection
          },
          (error) => {
            Swal.fire('Error', 'Error deleting enquiry: ' + error.message, 'error');
          }
        );
      } else {
        Swal.fire('Cancelled', 'Deletion cancelled', 'info');
      }
    });
  }
  refreshEnquiryList(): void {
    this.enquiryListSer.getEnquiryList(this.pageNumber, this.pageSize, ).subscribe((response) => {
      this.enquiries = response.enquires;
      this.totalRecords = response.totalRecords;
      this.tempData = response.enquires;
      // Initialize filtered data
      this.filteredData = [...this.enquiries];
      console.log("all enquiries",this.filteredData)

      // Calculate the total number of pages
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    });
  }
  wrapText(text: string, width: number): string {
    const words = text.split(' ');
    const wrappedText = [];
    let currentLine = '';
  
    for (const word of words) {
      if (currentLine.length + word.length > width) {
        wrappedText.push(currentLine);
        currentLine = word;
      } else {
        currentLine += (currentLine ? ' ' : '') + word;
      }
    }
  
    wrappedText.push(currentLine);
    return wrappedText.join('<br>');
  }
  
  resetAllList(){
    this.requiredEquipmentModalService.resetEquipmentList();
    this.pakageDetailModalService.resetPakagesList();
    this.enquiryAddressModalService.resetAddressList();
  }
}
