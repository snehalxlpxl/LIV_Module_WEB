import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivTaskApproveListService } from '../liv-task-approver-list/liv-task-approve-list.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'app/auth/models';

@Component({
  selector: 'app-livform',
  templateUrl: './livform.component.html',
  styleUrls: ['./livform.component.scss']
})
export class LivformComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  requestId: number;
  approverId: number;
  loading: boolean;
  tempData: any;
  filteredData: any[];
  rows: any[];
  userName: any;
  userId: any;  // Example approver ID, this would typically come from a service or route
  isApprover: boolean;
  approver: any;
  // requestId: number;
  constructor(private route:ActivatedRoute,private router:Router,private LivTaskApproveListSer: LivTaskApproveListService) { 
    const storedUser = localStorage.getItem('currentUser');

    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);

    this.currentUser = this.currentUserSubject.asObservable();

  }

  ngOnInit(): void {
    console.log("LivformComponent Loaded......... ");
    // Fetch user data from localStorage (or sessionStorage if you're using that)
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    
    if (userData) {
      this.userId = userData.userId;
      console.log('User Name:', userData.userName);
      console.log('User ID:', this.userId);
      this.approver=userData.loginFailStreak;
      console.log('Approver++++++++++++++++:', this.approver);
    } else {
      console.log('No user data found in localStorage');
    }
  }
// getter: currentUserValue
public get currentUserValue(): User {
  console.log("this.currentUserSubject.value++++++++++++++", this.currentUserSubject.value)
  return this.currentUserSubject.value;
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