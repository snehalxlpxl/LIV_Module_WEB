import { Component, OnInit, OnDestroy, ViewChild, Input } from "@angular/core";
import { Subject } from "rxjs";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { CustPreviewTrasacServiceService } from "../customer-preview-transac-section/cust-preview-trasac-service.service";
import { CustomerEnquiryListSectionService } from "./customer-enquiry-list-section.service";
// import { CoreConfigService } from "@core/services/config.service";

// import { Router } from "@angular/router";
// import { ToastrService } from "ngx-toastr";
// import { CustomerPreviewShipmentService } from "../cutomer-preview-shipment-section/customer-preview-shipment.service";


@Component({
  selector: 'app-customer-enquiry-list-section',
  templateUrl: './customer-enquiry-list-section.component.html',
  styleUrls: ['./customer-enquiry-list-section.component.scss']
})
export class CustomerEnquiryListSectionComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  private _unsubscribeAll: Subject<any>;
  public _companyId: number;
  @Input() set companyId(data: number) {
    this._companyId = data;
    console.log('hello Customer companyId:', this._companyId)
  }
  get companyId(): number {
  return this._companyId;
}
  
public data: any[] = [];
  public rows: any[] = [];
  public tempData: any[] = [];
  public tempFilterData: any[] = [];
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public selectStatus: any = [
    { name: "All", value: "" },
    { name: "Downloaded", value: "Downloaded" },
    { name: "Draft", value: "Draft" },
    { name: "Paid", value: "Paid" },
    { name: "Partial Payment", value: "Partial Payment" },
    { name: "Past Due", value: "Past Due" },
    { name: "Sent", value: "Sent" },
  ];

  constructor(
    private _customerEnquiryListService: CustomerEnquiryListSectionService,
  
  ) {}

  
  ngOnInit(): void {
 
    // this.loadCustomer(this._companyId);
    // this.fetchdata(this._companyId);
    this.loadTransaction();    
  }
  // ngOnDestroy(): void {
  //   if (this._unsubscribeAll) {
  //     this._unsubscribeAll.next(null);
  //     this._unsubscribeAll.complete();
  //   }
  // }

 

  // fetchdata(id:any)
  // {
  //   this._customertrascPrevService.getdatarow(id).subscribe((rows: any[]) => {
  //     this.data = rows;
  //       this.rows = this.data;
  //       this.tempData = this.rows;
  //       this.tempFilterData = this.rows;
  //       console.log("invoices", this.rows);
  //   });
  // }
  onPage(event: any) {
    this.pageNumber = event.page + 1;
    this.loadTransaction();
  }
  // getInvoices
  loading: boolean;
  transactions:any;
  totalRecords: number = 0;
  totalRecords2: any[]=[]
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pages: number[] = [];
  filteredData: any[] = []; // Data after filtering
  filteredData2: any[] = []; // Data after filtering

  loadTransaction() {
    this.loading = true;
    this._customerEnquiryListService.getEnquiryListByCompanyId(this._companyId,this.pageNumber, this.pageSize).subscribe(response => {
      this.transactions = response.enquiryList;
      this.totalRecords = response.totalRecords;
      this.tempData = response.enquiryList;
      console.log(" this.enquiryList", this.tempData)
      // Initialize filtered data
      this.filteredData = [...this.transactions];
      // Calculate the total number of pages
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

      // Update pagination and page data

      this.updatePagination();
      this.updatePageData();
      

      this.loading = false;
    }, error => {
      console.error('Error fetching companies', error);
      this.loading = false;
    });
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadTransaction();
      this.updatePageData(); 
      this.updatePagination(); 
    }
  }

  goToPreviousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadTransaction();
      this.updatePageData(); 
      this.updatePagination(); 
    }
  }

  goToNextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadTransaction();
      this.updatePageData(); 
      this.updatePagination(); 
    }
  }
  updatePagination() {
    const pagesToShow = 5; // Number of page numbers to show
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
  updatePageData() {
    const start = (this.pageNumber - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.rows = this.filteredData.slice(start, end);
  }
 
  filterUpdate(event: any) {
    const val = (event.target.value || "").toLowerCase();
  
    // Make an API call to fetch filtered data from the server
    this._customerEnquiryListService.getEnquiryListByCompanyId(this._companyId,this.pageNumber, this.pageSize, val).subscribe(
      (response: any) => {
        // Update the table data with the filtered data from the server
        this.transactions = response.enquiryList;
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

}
