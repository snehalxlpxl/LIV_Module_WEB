import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/auth/models';
import { Console } from 'console';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-load-list-sale-or-approver',
  templateUrl: './load-list-sale-or-approver.component.html',
  styleUrls: ['./load-list-sale-or-approver.component.scss']
})
export class LoadListSaleOrApproverComponent implements OnInit {
    //public
    public currentUser: Observable<User>;
      //private
  private currentUserSubject: BehaviorSubject<User>;
     // getter: currentUserValue
  public get currentUserValue(): User {
    console.log("this.currentUserSubject.value",this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }
  userName: any;
  userId: any;
  requestId: number;
  approverId: number;
  approver: any;

  constructor(private route:ActivatedRoute,private router:Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
 
    this.currentUser = this.currentUserSubject.asObservable();
    
   }

  ngOnInit(): void {
     const userData = JSON.parse(localStorage.getItem('currentUser'));
  
  if (userData) {
    this.userName = userData.userName;
    this.userId = userData.userId;

    // Log the values for debugging
    console.log('User Name:', this.userName);
    console.log('User ID:', this.userId);

    // Check if the approver is in the list of allowed approver IDs
    const validApprovers = [113057, 113058, 113059, 113060, 113061, 113062];

    if (!validApprovers.includes(this.userId)) {
      console.log("this.userId++++++", this.userId); // Log the userId for debugging
      this.router.navigate(['credit-limit-req-list']); 
    } else {
      this.router.navigate([`liv-task-approve-list/${this.userId}`]);
    }
  } else {
    // Handle the case where user data is not found
    console.log('No user data found in local storage');
    this.router.navigate(['credit-limit-req-list']);
  }
  }

}
