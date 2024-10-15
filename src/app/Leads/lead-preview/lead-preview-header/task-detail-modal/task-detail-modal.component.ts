import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LeadCreateService, Priority, Status } from 'app/Leads/lead-create/lead-create.service';
import { TaskDetailService } from './TaskDetail.service';
import { ActivatedRoute } from '@angular/router';
import { TaskDetail } from './TaskDetail';
// import { CronJob } from 'cron';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ActivityNotificationService } from '../../lead-preview-activities-section/ActivityNotificationService.service';
@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss']
})
export class TaskDetailModalComponent implements OnInit {
  userName: any | undefined;
  userId: any | undefined;
  submitted = false;
  errorMessage: string | null = null;
  taskDetailForm: FormGroup;
  priorities = [];
  statuses = [];
  @Input() leadId: any;
  @Input() activityId: number;

  // reminderJob: CronJob;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,  private leadCreateService: LeadCreateService, private taskDetailService: TaskDetailService,private route: ActivatedRoute,   private activityNotificationService: ActivityNotificationService) { }
  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
  } else {
      console.log('No user data found in sessionStorage');
  }
    this.taskDetailForm = this.fb.group({
      title: ['', Validators.required],
      startDate : ['', Validators.required],
      dueDate : ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      reminder: [''],
      repeat:[''],
      description:['']
    });
    this.getPriority();
    this.getStatus();
    console.log("Received leadId in TaskDetailModalComponent", this.leadId);
    console.log('activityId:', this.activityId);
    this.patchFormValues(this.activityId);
  }
  save() {
    this.submitted = true;

    if (this.taskDetailForm.valid) {
      // Extract form values
      const formValues = this.taskDetailForm.value;
  
      // Map the form values to the required format
      const taskDetailData: TaskDetail = {
        taskId:this.activityId || 0, // Assuming it's a new task
        leadId: Number(this.leadId), // Replace with the actual leadId
        title: formValues.title,
        startDate: formValues.startDate,
        dueDate: formValues.dueDate,
        priority: formValues.priority.name ||formValues.priority,// Extracting the priority name
        status: formValues.status.name ||formValues.status , // Extracting the status name
        reminder: formValues.reminder,
        repeat: formValues.repeat,
        description: formValues.description,
        createdAt: new Date().toISOString(), // Assuming current time for creation
        modifiedAt: new Date().toISOString(), // Assuming current time for modification
        deletedAt: null, // Assuming not deleted yet
        createdBy: null, // Replace with the actual current user
        modifiedBy: null, // Replace with the actual current user
        deletedBy: null, // Not deleted
        isDeleted: false, // Not deleted
        userId:this.userId,
        officeId: null,
        ActivityType:'task',
      };
  
      // Log the transformed data to check if it's correct
      console.log("taskDetailData",taskDetailData);
       // Schedule reminders if a reminder is set
      if (formValues.reminder) {
        this.scheduleReminder(formValues.startDate);
      }
     // Determine whether to add or update based on the taskId
    if (taskDetailData.taskId > 0) {
      // Update the existing task
      this.taskDetailService.editTaskDetail(this.activityId,taskDetailData).subscribe(() => {
        console.log("Task detail updated successfully", taskDetailData);
        Swal.fire('Success', 'Updated successfully', 'success');
        // window.location.reload();
        this.activeModal.close('success');
        this.activityNotificationService.notifyActivitiesChange(); // Notify change

      }, error => {
        this.errorMessage = 'Failed to update task.';
        console.log(this.errorMessage);
      });
    } else {
      // Add a new task
      this.taskDetailService.addTaskDetail(taskDetailData).subscribe(() => {
        console.log("Task detail added successfully", taskDetailData);
        Swal.fire('Success', 'Added successfully', 'success');
        // window.location.reload();
        this.activeModal.close('success');
        this.activityNotificationService.notifyActivitiesChange(); // Notify change
      }, error => {
        this.errorMessage = 'Failed to add task.';
        console.log(this.errorMessage);
      });
    }
    } else {
      this.taskDetailForm.markAllAsTouched();
      return;
      // this.errorMessage = 'Please fill out all required fields correctly.';
      // console.log(this.errorMessage);
    }
  }
  
  
  scheduleReminder(startDate: string) {
    const startTime = new Date(startDate).getTime();
    const reminderTime = startTime - (15 * 60 * 1000); // 15 minutes before startDate
  
    const now = new Date().getTime();
    const timeUntilReminder = reminderTime - now;
  
    if (timeUntilReminder > 0) {
      setTimeout(() => {
        Swal.fire({
          title: 'Reminder',
          text: `Reminder for task: ${this.taskDetailForm.value.title}`,
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }, timeUntilReminder);
    } else {
      console.warn('Reminder time is in the past!');
    }
  }
  
  

getPriority(){
  this.leadCreateService.getPriority().subscribe(
    (data: Priority[]) => {this.priorities = data
      console.log("priorities",this.priorities)
    },
    (error) => console.error('Failed to fetch call priorities', error)
  );

}
getStatus():void
{
  this.leadCreateService.getStatus().subscribe(
    (data: Status[]) => {
      this.statuses = data
      console.log("callTypes",this.statuses)
    },
    (error) => console.error('Failed to fetch call statuses', error)
  );

}
patchFormValues(activityId: number): void {
  console.log("activityId", activityId);

  this.leadCreateService.getTaskById(activityId).subscribe((task: any) => {
    console.log('Task patchValueData:', task);

    this.taskDetailForm.patchValue({
      taskId: task.taskId || 0, // Use taskId from the API response or 0 for a new task
      leadId: Number(this.leadId), // Ensure leadId is correctly assigned
      title: task.title, // Use task.title instead of formValues.title
      startDate: task.startDate, // Use task.startDate instead of formValues.startDate
      dueDate: task.dueDate, // Use task.dueDate instead of formValues.dueDate
      priority: task.priority, // Extracting the priority name from the task
      status: task.status, // Extracting the status name from the task
      reminder: task.reminder, // Use task.reminder instead of formValues.reminder
      repeat: task.repeat, // Use task.repeat instead of formValues.repeat
      description: task.description, // Use task.description instead of formValues.description
      createdAt: new Date().toISOString(), // Assuming current time for creation
      modifiedAt: new Date().toISOString(), // Assuming current time for modification
      deletedAt: null, // Assuming not deleted yet
      createdBy: task.createdBy || null, // Use task.createdBy if available
      modifiedBy: task.modifiedBy || null, // Use task.modifiedBy if available
      deletedBy: task.deletedBy || null, // Use task.deletedBy if available
      isDeleted: task.isDeleted || false, // Use task.isDeleted if available
      userId: task.userId || 19, // Use task.userId if available
      officeId: task.officeId || null, // Use task.officeId if available
      ActivityType: 'task' // Set as 'task' to match the activity type
    });
  });
}

}
