import { Component, OnInit, OnDestroy, ViewChild, Input } from "@angular/core";
import { Subject } from "rxjs";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { CoreConfigService } from "@core/services/config.service";

import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CustomerPreviewShipmentService } from "./customer-preview-shipment.service";
@Component({
  selector: 'app-customer-preview-shipment-section',
  templateUrl: './customer-preview-shipment-section.component.html',
  styleUrls: ['./customer-preview-shipment-section.component.scss']
})
export class CustomerPreviewShipmentSectionComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  public data: any[];
  public rows: any[];
  public tempData: any[];
  public tempFilterData: any[];

  public _companyId: number;
  @Input() set companyId(data: number) {
    this._companyId = data;
    console.log('hello Customer companyId:', this._companyId)
  }
  get companyId(): number {
  return this._companyId;
}
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

  /**
   * Constructor
   *
   * @param {CustomerPreviewShipmentService} _customerListService
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _customerPrevService: CustomerPreviewShipmentService,
    private _coreConfigService: CoreConfigService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const val = (event.target.value || "").toLowerCase();

    // filter our data
    const temp = this.tempData.filter((d) => {
      return d.cargoNumber.toLowerCase().includes(val) || !val;
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
        row.cargoNumber.toLowerCase().includes(statusFilter) ||
        !statusFilter
      );
    });
  }

  ngOnInit(): void {
 
  // this.fetchCustShipment(this._companyId);
  this.loadShipments();
  }

  // fetchCustShipment(id:number){

  //   this._customerPrevService
  //     .fetchShipment(id)
  //     .subscribe((rows: any[]) => {
  //       this.data = rows;
  //         this.rows = this.data;
  //         this.tempData = this.rows;
  //         this.tempFilterData = this.rows;
  //         console.log("Shipment", this.rows);
  //     });
  // }

  // ******************

  onPage(event: any) {
    this.pageNumber = event.page + 1;
    this.loadShipments();
  }
  // getInvoices
  loading: boolean;
  shipments:any;
  totalRecords: number = 0;
  totalRecords2: any[]=[]
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pages: number[] = [];
  filteredData: any[] = []; // Data after filtering
  filteredData2: any[] = []; // Data after filtering

  loadShipments() {
    this.loading = true;
    this._customerPrevService.getShipments(this._companyId,this.pageNumber, this.pageSize).subscribe(response => {
      this.shipments = response.cargos;
      this.totalRecords = response.totalRecords;
      this.tempData = response.cargos;
      // Initialize filtered data
      this.filteredData = [...this.shipments];
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
      this.loadShipments();
      this.updatePageData(); 
      this.updatePagination(); 
    }
  }

  goToPreviousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadShipments();
      this.updatePageData(); 
      this.updatePagination(); 
    }
  }

  goToNextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadShipments();
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
 
  filterUpdate2(event: any) {
    const val = (event.target.value || "").toLowerCase();
  
    // Make an API call to fetch filtered data from the server
    this._customerPrevService.getShipments(this._companyId,this.pageNumber, this.pageSize, val).subscribe(
      (response: any) => {
        // Update the table data with the filtered data from the server
        this.shipments = response.cargos;
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
