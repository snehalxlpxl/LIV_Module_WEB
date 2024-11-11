import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CallPurpose, CallResult, CallStatus, CallType, LeadCreateService } from 'app/Leads/lead-create/lead-create.service';
import { NgSelectComponent } from "@ng-select/ng-select";
import Swal from 'sweetalert2';
import { CallLogInformation } from './CallLogInformation';
import { Router } from '@angular/router';
import { ActivityNotificationService } from '../../lead-preview-activities-section/ActivityNotificationService.service';
import { SharedService } from 'app/shared.service';

@Component({
  selector: 'app-call-log-modal',
  templateUrl: './call-log-modal.component.html',
  styleUrls: ['./call-log-modal.component.scss']
})
export class CallLogModalComponent implements OnInit {
  userName: any | undefined;
  userId: any | undefined;
  submitted = false;
  errorMessage: string | null = null;
  callLogForm: FormGroup;
  callStatuses: any;
  callTypes: any;
  callPurposes = [];
  callResults = [];
  callLogId: any;  // If you're editing an existing call log, its ID will be stored here
  @Input() leadId: any; // The lead ID will be passed from the parent component
  @Input() activityId: any;
  @ViewChild("select") select: NgSelectComponent;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private leadCreateService: LeadCreateService,private router: Router,  private activityNotificationService: ActivityNotificationService,
    private userService: SharedService

  ) { }

  ngOnInit(): void {
    const userData = this.userService.getUserData();
    if (userData) {
      this.userName = this.userService.getUserName();
      this.userId = this.userService.getUserId();
      console.log('User Data:', userData);
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
    } else {
      console.log('No user data found in localStorage');
    }
    this.callLogForm = this.fb.group({
      markAsComplete: [false],
      title: ['', Validators.required],
      callStatus: ['', Validators.required],
      callType: ['', Validators.required],
      subject: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      callPurpose: ['', Validators.required],
      callResult: ['', Validators.required],
      callResultDetails: ['']
    });
    this.getCallStatuses();
    this.getCallTypes();
    this.getCallPurpose();
    this.getcallResult();
    console.log("Received leadId in callLogComponent", this.leadId);
    console.log('activityId:', this.activityId);
    this.patchFormValues(this.activityId);
  }
  save() {
    this.submitted = true;
    if (this.callLogForm.valid) {
      const formValues = this.callLogForm.value;

      const callLogData: CallLogInformation = {
        callId: this.activityId || 0,
        leadId: Number(this.leadId),
        title: formValues.title,
        callStatus: formValues.callStatus,
        callType: formValues.callType,
        subject: formValues.subject,
        startTime: formValues.startTime,// Ensure correct ISO format
        endTime: formValues.endTime, // Ensure correct ISO format
        callPurpose: formValues.callPurpose.name ||formValues.callPurpose,
        callResult: formValues.callResult.name||formValues.callResult,
        callResultDetails: formValues.callResultDetails,
        isMarkAsComplete: formValues.markAsComplete ||formValues.isMarkAsComplete,  // Corrected property name
        createdAt: new Date().toISOString(), // Assuming current time for creation
        modifiedAt: new Date().toISOString(), // Assuming current time for modification
        deletedAt: null, // Assuming not deleted yet
        createdBy: null, // Replace with the actual current user
        modifiedBy: null, // Replace with the actual current user
        deletedBy: null, // Not deleted
        isDeleted: false, // Not deleted
        userId:this.userId,
        officeId: null,
        ActivityType: 'call',

      };
      console.log("callLogId", this.activityId);
      if (this.activityId) {
        this.leadCreateService.updateCallLog(this.activityId, callLogData).subscribe(
          () => {
            Swal.fire('Success', 'Call log updated successfully', 'success');
            this.activeModal.close('success');
            // window.location.reload();
            this.activityNotificationService.notifyActivitiesChange(); // Notify change
          },
          error => {
            this.errorMessage = 'Failed to update call log.';
            console.error(this.errorMessage, error);
          }
        );
      } else {
        console.log(callLogData);
        this.leadCreateService.addCallLog(callLogData).subscribe(
          () => {
            Swal.fire('Success', 'Call log added successfully', 'success');
            this.activeModal.close('success');
            // window.location.reload();
            this.activityNotificationService.notifyActivitiesChange(); // Notify change
          },
          error => {
            this.errorMessage = 'Failed to add call log.';
            console.error(this.errorMessage, error);
          }
        );
      }
    } else {
      this.callLogForm.markAllAsTouched();
      return;
    
    }
  }
  getCallStatuses() {
    this.leadCreateService.getCallStatuses().subscribe(
      (data: CallStatus[]) => {
        this.callStatuses = data
        console.log("callStatuses", this.callStatuses)
      },
      (error) => console.error('Failed to fetch call statuses', error)
    );

  }
  getCallTypes() {
    this.leadCreateService.getCallTypes().subscribe(
      (data: CallType[]) => {
        this.callTypes = data
        console.log("callTypes", this.callTypes)
      },
      (error) => console.error('Failed to fetch call types', error)

    );

  }

  getCallPurpose() {
    this.leadCreateService.getCallPurpose().subscribe(
      (data: CallPurpose[]) => {
        this.callPurposes = data
        console.log("callPurposes", this.callPurposes)
      },
      (error) => console.error('Failed to fetch callPurposes', error)
    );

  }
  getcallResult() {
    this.leadCreateService.getcallResult().subscribe(
      (data: CallResult[]) => {
        this.callResults = data
        console.log("CallResult", this.callResults)
      },
      (error) => console.error('Failed to fetch callPurposes', error)
    );

  }
  patchFormValues(activityId: number): void {
    console.log("activityId", activityId);
    this.leadCreateService.getCallLogById(activityId).subscribe((callLog: any) => {
      console.log('Call patchValueData:', callLog);
      this.callLogForm.patchValue({
        callId: callLog.callId, // Assuming `callId` comes from `callLog`
        leadId: Number(this.leadId),
        title: callLog.title, // Assuming `title` comes from `callLog`
        callStatus: callLog.callStatus,
        callType: callLog.callType,
        subject: callLog.subject,
        startTime: callLog.startTime, // Ensure this is in the correct ISO format
        endTime: callLog.endTime, // Ensure this is in the correct ISO format
        callPurpose: callLog.callPurpose, // Assuming `callPurpose` is an object
        callResult: callLog.callResult, // Assuming `callResult` is an object
        callResultDetails: callLog.callResultDetails,
        markAsComplete: callLog.isMarkAsComplete, // Corrected property name
        createdAt: callLog.createdAt || new Date().toISOString(), // Use existing or current time
        modifiedAt: new Date().toISOString(), // Assuming current time for modification
        deletedAt: callLog.deletedAt || null, // Assuming not deleted yet
        createdBy: callLog.createdBy || null, // Replace with the actual current user
        modifiedBy: callLog.modifiedBy || null, // Replace with the actual current user
        deletedBy: callLog.deletedBy || null, // Not deleted
        isDeleted: callLog.isDeleted || false, // Not deleted
        userId: callLog.userId || 19, // Assuming `userId` is provided, otherwise default to 19
        officeId: callLog.officeId || null, // Assuming `officeId` might be null
        ActivityType: 'call', // Assuming this is constant
        // patch other form controls
      });
    });
  }

}

