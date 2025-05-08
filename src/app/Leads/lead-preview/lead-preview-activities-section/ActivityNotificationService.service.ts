// activity-notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityNotificationService {
  private activitiesSubject = new BehaviorSubject<void>(null);  //BehaviorSubject allows subscribers to receive the last emitted value upon subscription. 
  activities$ = this.activitiesSubject.asObservable();
  // observable

  // This method is used to emit a new value to all subscribers. When called, it triggers the next() method on activitiesSubject
  notifyActivitiesChange() {
    this.activitiesSubject.next();
  }
  private approvalSubject = new BehaviorSubject<void>(null); 
  approvalStatus$ = this.approvalSubject.asObservable(); 
    notifyUpdateApprovalChange() {
    this.approvalSubject.next();
    }


  // private activitySubject = new Subject<any>(); // Holds the activity message
  private activitySubject = new BehaviorSubject<string>(null); 

  // Observable that other components can subscribe to
  activity$ = this.activitySubject.asObservable();

  // Method to send notifications
  notify(message: any): void {
    this.activitySubject.next(message);
    this.notificationSubject.next(message);

  }

    // Create a subject to trigger refresh notifications
    private refreshSubject = new Subject<void>();

    // Observable to allow components to subscribe
    refreshData$ = this.refreshSubject.asObservable();
  
    // Method to trigger refresh
    notifyRefresh() {
      this.refreshSubject.next();
    }
    private notificationSubject = new Subject<string>();
    notifications = this.notificationSubject.asObservable(); // Define the notifications observable
  
}
