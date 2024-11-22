import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private currentUser: any = null;

  constructor() { 
    this.loadUserData();
  }

private loadUserData(): void {
  const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (userData) {
    this.currentUser = userData;
  }
}

getUserData(): any {
  return this.currentUser;
}

getUserName(): string | null {
  return this.currentUser ? this.currentUser.userName : null;
}

getUserId(): string | null {
  return this.currentUser ? this.currentUser.userId : null;
}
getUserEmail(): string | null {
  return this.currentUser ? this.currentUser.email : null;
}

clearUserData(): void {
  localStorage.removeItem('currentUser');
  this.currentUser = null;
}

// Optional: Update user data in both service and localStorage
setUserData(userData: any): void {
  this.currentUser = userData;
  localStorage.setItem('currentUser', JSON.stringify(userData));
}
}
