import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Subject } from "rxjs";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { CoreConfigService } from "@core/services/config.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { CustomerListService } from "../../customers/customer-list/customer-list.service";
import { Company } from "../../customers/customer-list/company";
import { CreditLimitRequestModalComponent } from "./credit-limit-request-modal/credit-limit-request-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CreditLimitReqListService } from "./credit-limit-req-list.service";
import { CustomerCreateService } from "../../customers/customer-create/customer-create.service";
import { ActivityNotificationService } from "app/Leads/lead-preview/lead-preview-activities-section/ActivityNotificationService.service";
import { LivPreviewTimelineSectionService } from "../liv-preview-overview-section/liv-preview-timeline-section/liv-preview-timeline-section.service";
import { CreditLimitRequestModalService } from "./credit-limit-request-modal/credit-limit-request-modal.service";
import { LivPreviewComponent } from "../liv-preview/liv-preview.component";
import { LivPreviewService } from "../liv-preview/liv-preview.service";
// /Users/pratikshajadhav/Documents/Fretrack_25OCT24 /25Oct_FretrackWeb/src/app/layout/components/navbar/navbar-notification/notifications.service.ts
@Component({
  selector: 'app-credit-limit-req-list',
  templateUrl: './credit-limit-req-list.component.html',
  styleUrls: ['./credit-limit-req-list.component.scss']
})
export class CreditLimitReqListComponent implements OnInit {


  private _unsubscribeAll: Subject<any>;
  public data: Company[];
  public rows: Company[];
  public tempData: Company[];
  salesPerson: any;

  public tempFilterData: Company[];
  public selectedOption = 12;
  public ColumnMode = ColumnMode;
  public searchValue = "";
  statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Awaiting Approval', value: 'Awaiting Approval' },
    { label: 'Rejected', value: 'Rejected' }
  ];
  selectedStatus: string = 'All Statuses';

  // ViewChild decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  public previousStatusFilter = "";
  loading: boolean;
  awaitingApprovedCount: number;
  userName: any;
  userId: any;
  livRequests: any;


  /**
   * Constructor
   *
   * @param {CustomerListService} _customerListService
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _customerListService: CustomerListService,
    private CreditLimitReqListSer: CreditLimitReqListService,
    private _coreConfigService: CoreConfigService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private apiService: CustomerCreateService,
    private activityNotificationService: ActivityNotificationService,
    private timelineService: LivPreviewTimelineSectionService,
    private CreditLimitSer:CreditLimitRequestModalService,
    private livPreviewService:LivPreviewService
  ) { }


  /**
   * filterUpdate
   *
   * @param event
   */
  // filterUpdate1(event) {
  //   const val = (event.target.value || "").toLowerCase();

  //   // filter our data
  //   const temp = this.tempData.filter((d) => {
  //     return d.companyName.toLowerCase().includes(val) || !val;
  //   });

  //   // update the rows
  //   this.rows = temp;
  //   // Whenever the filter changes, always go back to the first page
  //   if (this.table) {
  //     this.table.offset = 0;
  //   }
  // }

  // /**
  //  * Filter By Status
  //  *
  //  * @param event
  //  */
  // filterByStatus1(event) {
  //   const filter = event ? event.value : "";
  //   this.previousStatusFilter = filter;
  //   this.tempFilterData = this.filterRows(filter);
  //   this.rows = this.tempFilterData;
  // }

  /**
   * Filter Rows
   *
  //  * @param statusFilter
  //  */
  // filterRows(statusFilter): any[] {
  //   // Reset search on select change
  //   this.searchValue = "";

  //   statusFilter = (statusFilter || "").toLowerCase();

  //   return this.tempData.filter((row) => {
  //     return (
  //       row.companyApprovalStatus.toLowerCase().includes(statusFilter) ||
  //       !statusFilter
  //     );
  //   });
  // }

  ngOnInit(): void {

    // this.loadCustomer();
    console.log("++++++++++++++++++++++", this.tempData);
    this.loadSalesPerson();


    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
      // this.router.navigate(['/credit-limit-req-list']);
      this.loadLIVRequests(this.userId);
      this.checkIfDelegate(this.userId);
      this.checkIsApproverDelegate(this.userId);
      

    }
    this.activityNotificationService.activity$.subscribe((message: string) => {
      console.log('Notification received:', message);

      if (message === 'Credit limit request created successfully.') {
        // Reload the requests when notified
        this.loadLIVRequests(this.userId);
      }
    });
  }
  getRowHeight(row: any): number {
    // return row.name && row.name.length > 30 ? 80 : 40; // Adjust values based on content length
    return row.customerName && row.customerName.length > 50 ? 120 : 60;

  }
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
            this.loadLIVRequests(this.userId);

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

  filterByStatus() {
    if (this.selectedStatus === '' || this.selectedStatus === 'All Statuses') {
      console.log("selectedStatus", this.selectedStatus)
      console.log("filteredData", this.filteredData)

      // Show all requests if "All Statuses" is selected
      this.filteredData = [...this.livRequests];
    } else {
      console.log("selectedStatus", this.selectedStatus)
      // Filter based on the selected status
      this.filteredData = this.livRequests.filter((request) => request.status === this.selectedStatus);
      console.log("filteredData", this.filteredData)
      this.cdr.detectChanges();

    }

    // Update pagination after filtering
    this.updatePageData();
    this.updatePagination();
  }

  onPage(event: any) {
    this.pageNumber = event.page + 1;
    this.loadLIVRequests(this.userId);
  }

  // rows: any[] = [];
  // tempData: any[] = [];

  totalRecords: number = 0;
  totalRecords2: any[] = []
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pages: number[] = [];

  loadLIVRequests(userId: any) {
    this.CreditLimitReqListSer.getLIVRequests(userId, this.pageNumber, this.pageSize, "")
      .subscribe(response => {
        this.livRequests = response.livrequest || [];
        this.totalRecords = response.totalRecords || 0;
        this.tempData = response.companies || [];
        this.awaitingApprovedCount = response.awaitingApprovedCount || 0; // Global count from API
        console.log("Count of 'Awaiting Approval' requests:", this.awaitingApprovedCount);

        // Initialize filtered data
        this.filteredData = [...this.livRequests];
        console.log("all liv data", this.livRequests);

        // this.awaitingApprovedCount = this.livRequests.filter(request => request.status === "Awaiting Approval").length;
        // console.log("Count of 'Awaiting Approval' requests:", this.awaitingApprovedCount);

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
      this.loadLIVRequests(this.userId);
      this.updatePageData();
      this.updatePagination();
    }
  }

  goToPreviousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadLIVRequests(this.userId);
      this.updatePageData();
      this.updatePagination();
    }
  }

  goToNextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadLIVRequests(this.userId);
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

  filterUpdate(event: any) {
    const val = (event.target.value || "").toLowerCase();

    // Make an API call to fetch filtered data from the server
    this.CreditLimitReqListSer.getLIVRequests(this.userId, this.pageNumber, this.pageSize, val).subscribe(
      (response: any) => {
        // Update the table data with the filtered data from the server
        this.livRequests = response.livrequest;
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
  openCreditLimitReqModal(rowData: any) {
    const modalRef = this.modalService.open(CreditLimitRequestModalComponent);
    modalRef.componentInstance.livRequestData = rowData;  // Passing data to modal

    modalRef.result.then(
      (result) => {
        this.loadLIVRequests(this.userId);
        console.log('Modal closed with result:', result);
      },
      (reason) => {
        this.loadLIVRequests(this.userId);
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }

  // isDelegate: boolean = false;
  isDelegate: boolean | null = null;
  message: string;
  checkIfDelegate(userId: number) {
    this.isDelegate = null;  // Set to null to trigger loading state
    this.CreditLimitReqListSer.isDelegate(userId).subscribe(response => {
      console.log("Delegate Info", response);
      this.isDelegate = response.isDelegate;
      // if(this.isDelegate==true){
      if (this.isDelegate) {
        this.CreditLimitReqListSer.getDelegatesApprover(userId).subscribe(response => {
          this.message = `You have logged in as delegate for Mr. ` + response[0].approverName;
        });
      } else {

      }
      console.log('Is Delegate:', this.isDelegate); // For debugging
    });
  }
  IsApproverDelegate: boolean | null = null;
  // message: string;
  checkIsApproverDelegate(userId: number) {
    this.IsApproverDelegate = null;  // Set to null to trigger loading state
    this.CreditLimitReqListSer.IsApproverDelegate(userId).subscribe(response => {
      console.log("IsApproverDelegate Info", response);
      this.IsApproverDelegate = response.isApproverDelegate;
      
      console.log('Is IsApproverDelegate:', this.IsApproverDelegate); // For debugging
    });
  }

  loadSalesPerson() {
    this.apiService.getSalesPerson().subscribe((data: any[]) => {
      this.salesPerson = new Map(data.map(item => [item.userId, item.userDisplayName]));
      console.log("sales Person", this.salesPerson);
    });
  }

  getSalesPersonName(id: any): string {
    console.log(id)
    const salesPerson = this.salesPerson.find(person => person.id === id);
    return salesPerson ? salesPerson.name : 'Unknown'; // Handle cases where ID is not found
  }
  loadLivTaskTimeLine(rowData: any): void {
    console.log("loadLivTaskTimeLine call"+rowData.livRequestId);
    console.log("taskId:", rowData.livRequestId);
    console.log("row call",rowData);

    this.timelineService.getLivTaskTimeLine(rowData.livRequestId).subscribe(
      data => {
        console.log("API Response Data:", data);
        console.log(data[0].levelStatus)
      if (data.length === 1) {
        const levelStatus = data[0]?.levelStatus?.trim(); // Trim to remove extra spaces

        console.log("levelStatus:", levelStatus);
        
        if (levelStatus === "Approved") { // Corrected comparison
          console.warn("Record is already approved. Modal will not open.");
          Swal.fire({
            icon: 'info',
            title: 'Already Approved',
            text: 'This request has already been approved.',
            confirmButtonColor: '#007bff'
          });
          return;
       
        }
        console.log("Only one record found, opening modal...");
        this.openCreditLimitReqModal(rowData);
      } else {
        if(rowData.status=="Approved"){
          this.openLIVModalForApprovedStatus(rowData.livRequestId);
        }else{
          console.warn("More than one record found, modal will not open.");
          Swal.fire({
            icon: 'warning',
            title: 'This request has been process, you can not edit',
            confirmButtonColor: '#dc3545'
          });
        }
        
        
      }
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  livoldStatus:any;
  openLIVModalForApprovedStatus(livrequestId: any) {
    console.log("rowData",livrequestId);
    this.livPreviewService.getLIVRequest(livrequestId).subscribe((data) => {
      console.log("livRequestData approve++++++++++++++++++++++", data);
      this.livoldStatus=data.status;
      this.CreditLimitSer.CheckCustomerExistsApprove(this.livoldStatus,livrequestId).subscribe((exists: boolean) => {
        console.log('Customer exists with Approve status:', exists);
        if (exists) {
          console.log("exist with approve status",exists);
          this.CheckForOldLIVRequest(livrequestId);

        } 
      });
    

    // modalRef.result.then(
    //   (result) => {
    //     this.loadLIVRequests(this.userId);
    //     console.log('Modal closed with result:', result);
    //   },
    //   (reason) => {
    //     this.loadLIVRequests(this.userId);
    //     console.log('Modal dismissed with reason:', reason);
    //   }
    // );
    });
  }
  CheckForOldLIVRequest(livrequestId:any){
      this.CreditLimitSer.CheckOldLivRequest(livrequestId).subscribe((exists: boolean) => {
        console.log('Old Request exists:', exists);
        if (exists) {
          console.log("Old Request exists ---------",exists)
          Swal.fire({
            title: 'Error!',
            text: 'LIV Request Already in process',
            icon: 'error'
          });
          this.activityNotificationService.notify('Failed to create LIV Request.');
        }
        else{
          const modalRef = this.modalService.open(CreditLimitRequestModalComponent);
          modalRef.componentInstance.livRequestDataApprove = livrequestId;  // Passing data to modal
        }
      });
    }
  deleteLivTask(rowData: any): void {
    console.log("Deleting taskId:", rowData.livRequestId);
    console.log("Row Data for Delete:", rowData);
  
    this.timelineService.getLivTaskTimeLine(rowData.livRequestId).subscribe(
      (data: any[]) => {
        console.log("API Response Data:", data);
  
        if (data.length === 1) {
          const levelStatus = data[0]?.levelStatus?.trim(); // Trim to remove extra spaces
  
          console.log("levelStatus:", levelStatus);
  
          if (levelStatus === "Approved") { 
            console.warn("Record is already approved. Delete will not happen.");
            Swal.fire({
              icon: 'info',
              title: 'Already Approved',
              text: 'This request has already been approved, and cannot be deleted.',
              confirmButtonColor: '#007bff'
            });
            return;
          }
  
          console.log("Only one record found, proceeding with delete...");
          // Call the delete service or logic here
          this.confirmDelete(rowData);  // You can implement your confirmation and delete logic here
        } else {
          console.warn("More than one record found, delete will not happen.");
          Swal.fire({
            icon: 'warning',
            text: 'This request has been process, so it cannot be deleted.',
            confirmButtonColor: '#dc3545'
          });
        }
      },
      (error) => {
        console.error('Error fetching timeline data for delete:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong while trying to delete the record.',
          confirmButtonColor: '#d33'
        });
      }
    );
  }
  
  // Example of confirmDelete function (implement your delete logic here)
  confirmDelete(rowData: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with the delete operation (e.g., call the delete API or perform the action)
        this.CreditLimitReqListSer.deleteLivTask(rowData.livRequestId).subscribe(
          (response) => {
            console.log('Delete successful', response);
            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: 'The record has been deleted successfully.',
              confirmButtonColor: '#007bff'
            }).then(() => {
              // Refresh the list after deletion
              this.loadLIVRequests(this.userId);
            });
          },
          (error) => {
            console.error('Error during delete:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'There was an error deleting the record.',
              confirmButtonColor: '#d33'
            });
          }
        );
      }
    });
  }
  
}
