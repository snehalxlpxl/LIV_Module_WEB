import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { CoreConfigService } from "@core/services/config.service";
// import { CustomerListService } from "./customer-list.service";
import { Company } from "./company";

import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { CustomerListService } from "./customer-list.service";
import { TaxDetailsService } from "../customer-create/add-cust-gst-details/tax-details.service";
import { AddContactDetailService } from "../customer-create/add-cust-contact-modal/add-contact-detail.service";
import { AddCustAddressService } from "../customer-create/add-cust-addr-modal/add-cust-address.service";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  public data: Company[];
  public rows: Company[];
  public tempData: Company[];
  public tempFilterData: Company[];
  // Public properties
  // public data: any;
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
  public selectedStatus = [];
  public searchValue = "";

  // ViewChild decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  public previousStatusFilter = "";
  loading: boolean;


  /**
   * Constructor
   *
   * @param {CustomerListService} _customerListService
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _customerListService: CustomerListService,
    private _coreConfigService: CoreConfigService,
    private router: Router,
    private toastr: ToastrService,
    private taxDetailsService:TaxDetailsService,
    private addContactDetailService:AddContactDetailService,
    private addCustAddressService:AddCustAddressService


  ) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate1(event) {
    const val = (event.target.value || "").toLowerCase();

    // filter our data
    const temp = this.tempData.filter((d) => {
      return d.companyName.toLowerCase().includes(val) || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    if (this.table) {
      this.table.offset = 0;
    }
  }

  /**
   * Filter By Status
   *
   * @param event
   */
  filterByStatus(event) {
    const filter = event ? event.value : "";
    this.previousStatusFilter = filter;
    this.tempFilterData = this.filterRows(filter);
    this.rows = this.tempFilterData;
  }

  /**
   * Filter Rows
   *
   * @param statusFilter
   */
  filterRows(statusFilter): any[] {
    // Reset search on select change
    this.searchValue = "";

    statusFilter = (statusFilter || "").toLowerCase();

    return this.tempData.filter((row) => {
      return (
        row.companyApprovalStatus.toLowerCase().includes(statusFilter) ||
        !statusFilter
      );
    });
  }

  ngOnInit(): void {
 
    // this.loadCustomer();
    this.loadCompanies();
  }
  // loadCustomer() {
  //   this._customerListService
  //     .getDataTableRows()
  //     .then((rows: Company[]) => {
  //       this.data = rows;
  //       this.rows = this.data;
  //       this.tempData = this.rows;
  //       this.tempFilterData = this.rows;
  //       console.log(this.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching customer data:", error);
  //     });
  // }
  

  deleteCustomerByID(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#867ceb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Deleting customer with ID:", id);
        // Proceed with the deletion logic
        this._customerListService.updateIsDeleted(id).subscribe(
          (response) => {
            console.log("Customer deleted successfully");
            this.toastr.success("Customer deleted successfully", "", {
              timeOut: 3000,
            });
            // Redirect to the customer list route
            // this.loadCustomer();
            this.loadCompanies();
            
          },
          (error) => {
            console.error("Error deleting customer:", error);
            this.toastr.error("Failed to delete customer", "", {
              timeOut: 3000,
            });
          }
        );
      }
    });
  }

  
  onPage(event: any) {
    this.pageNumber = event.page + 1;
    this.loadCompanies();
  }

  // rows: any[] = [];
  // tempData: any[] = [];
  companies:any[]=[]
  totalRecords: number = 0;
  totalRecords2: any[]=[]
  pageNumber: number = 1;
  pageSize: number = 50;
  totalPages: number = 0;
  pages: number[] = [];

  

  loadCompanies() {
    this.loading = true;
    this._customerListService.getCompanies(this.pageNumber, this.pageSize).subscribe(response => {
      this.companies = response.companies;
      this.totalRecords = response.totalRecords;
      this.tempData = response.companies;
      // Initialize filtered data
      this.filteredData = [...this.companies];
      
      console.log("all cust",this.filteredData)

      // Calculate the total number of pages
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

      // Update pagination and page data
      this.updatePagination();
      // this.updatePageData();
      

      this.loading = false;
    }, error => {
      console.error('Error fetching companies', error);
      this.loading = false;
    });
  }
 

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadCompanies();
      this.updatePageData(); 
      this.updatePagination(); 
    }
  }

  goToPreviousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadCompanies();
      this.updatePageData(); 
      this.updatePagination(); 
    }
  }

  goToNextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadCompanies();
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
  filteredData: any[] = []; // Data after filtering
  filteredData2: any[] = []; // Data after filtering
  updatePageData() {
    const start = (this.pageNumber - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.rows = this.filteredData.slice(start, end);
  }
  // filterUpdate(event: any) {
  //   console.log(event.target.value)
  //   const val = (event.target.value||"").toLowerCase();
  //   console.log(this.filteredData)
  //   if (Array.isArray(this.filteredData)) {
  //     // Filter data based on companyName
  //     const temp = this.filteredData.filter(d =>
  //       d.companyName.toLowerCase().includes(val) || !val
  //     );
  
  //     // Update the rows to display on the current page
  //     this.companies = temp.slice((this.pageNumber - 1) * this.pageSize, this.pageNumber * this.pageSize);
  
  //     // Update pagination if necessary
  //     this.totalRecords = temp.length;
  //     this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  //     // this.loadCompanies();
  //     // this.updatePageData(); 
  //     this.updatePagination();
  
  //     // Reset the table to start from the first page
  //     if (this.table) {
  //       this.table.offset = 0;
  //     }
  //   } else {
  //     console.error('FilteredData is not an array:', this.filteredData);
  //   }
  // }
  filterUpdate(event: any) {
    const val = (event.target.value || "").toLowerCase();
  
    // Make an API call to fetch filtered data from the server
    this._customerListService.getCompanies(this.pageNumber, this.pageSize, val).subscribe(
      (response: any) => {
        // Update the table data with the filtered data from the server
        this.companies = response.companies;
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
  

  resetAllList(){
    this.taxDetailsService.resetTaxList();
    this.addContactDetailService.resetcontactList();
    this.addCustAddressService.resetaddressList();
  }
}
