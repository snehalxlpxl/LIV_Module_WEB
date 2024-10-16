// activity-notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

}
