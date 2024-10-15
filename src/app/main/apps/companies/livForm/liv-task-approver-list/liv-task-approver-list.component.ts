import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LivTaskApproveListService } from './liv-task-approve-list.service';
 
@Component({
  selector: 'app-liv-task-approver-list',
  templateUrl: './liv-task-approver-list.component.html',
  styleUrls: ['./liv-task-approver-list.component.scss']
})
export class LivTaskApproverListComponent implements OnInit {
  requestId: number;
  approverId: number;
  loading: boolean;
  tempData: any;
  filteredData: any[];
  rows: any[];
  userName: any;
  userId: any;
  approver:any;
  showAccessDeniedMessage: boolean = false; // Flag to control access message

  constructor(private route:ActivatedRoute,private LivTaskApproveListSer: LivTaskApproveListService,private router:Router) { }
 
  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
  } else {
      console.log('No user data found in sessionStorage');
  }
    this.route.params.subscribe(params => {
      // this.requestId = +params['requestId'];
      this.approverId = +params['approverId'];
 
      console.log("this.livrequestId="+this.requestId);
      console.log("this.approverId="+this.approverId);
    });
    
    const validUserIds = [113057, 113058, 113059, 113060, 113061, 113062]; // List of valid user IDs
    if (validUserIds!==this.userId) {
      console.log(this.userId)
      this.router.navigate(['liv-task-approve-list', this.approverId]);
    }
    else{
      console.log(this.userId)

      this.router.navigate(['/credit-limit-req-list']);
    }
    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;

      // Check if the userId is valid
      if (!validUserIds.includes(this.userId)) {
        this.showAccessDeniedMessage = true; // Set the flag to true if userId is invalid
        this.loadCompanies(this.userId);

      }
    } else {
      this.showAccessDeniedMessage = true; // Set the flag if no user data is found
    }
    // this.route.params.subscribe(params => {
    //   this.approverId = +params['approverId'];
    //   console.log("this.approverId="+this.approverId);
    // });
    this.loadCompanies(this.approverId);
  }
  task:any[]=[]
  totalRecords: number = 0;
  totalRecords2: any[]=[]
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pages: number[] = [];
 
  onPage(event: any) {
    this.pageNumber = event.page + 1;
    this.loadCompanies(this.approverId);
  }
 
  loadCompanies(approverId: number | null = null) {
    this.loading = true;
    this.LivTaskApproveListSer.getCompanies(this.pageNumber, this.pageSize,'',approverId).subscribe(response => {
      this.task = response.task;
      this.totalRecords = response.totalRecords;
      this.tempData = response.task;
      // Initialize filtered data
      this.filteredData = [...this.task];
      
      console.log("all liv task approve  data",this.task);
 
      // Calculate the total number of pages
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
 
      // Update pagination and page data
      // this.updatePagination();
      
 
      this.loading = false;
    }, error => {
      console.error('Error fetching companies', error);
      this.loading = false;
    });
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadCompanies(this.approverId);
      this.updatePageData();
      this.updatePagination();
    }
  }
 
  goToPreviousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadCompanies(this.approverId);
      this.updatePageData();
      this.updatePagination();
    }
  }
 
  goToNextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadCompanies(this.approverId);
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
  // filteredData: any[] = []; // Data after filtering
  filteredData2: any[] = []; // Data after filtering
  updatePageData() {
    const start = (this.pageNumber - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.rows = this.filteredData.slice(start, end);
  }
 
 
}
 
 