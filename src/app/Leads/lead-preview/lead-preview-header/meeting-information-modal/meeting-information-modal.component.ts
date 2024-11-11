import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LeadCreateService, MeetingStatus } from 'app/Leads/lead-create/lead-create.service';
import Swal from 'sweetalert2';
import { MeetingInformation } from './MeetingInformation';
import { ActivityNotificationService } from '../../lead-preview-activities-section/ActivityNotificationService.service';
import { SharedService } from 'app/shared.service';

@Component({
  selector: 'app-meeting-information-modal',
  templateUrl: './meeting-information-modal.component.html',
  styleUrls: ['./meeting-information-modal.component.scss']
})
export class MeetingInformationModalComponent implements OnInit {
  userName: any | undefined;
  userId: any | undefined;
  meetingInformationForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;
  meetingId: any;
  @Input() leadId: any;
  @Input() activityId: number;
  meetingStatuses:any;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private leadCreateService: LeadCreateService,private activityNotificationService: ActivityNotificationService,     private userService: SharedService
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
    this.meetingInformationForm = this.fb.group({
      onlineMeeting: [false],
      title: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      status:[''],
      location: [''],
      participants: ['', Validators.required],
      agenda: [''],
      notes: ['']
    });
    // Optionally, initialize the form with existing meeting data if editing
    if (this.meetingId) {
      this.loadMeetingData(this.meetingId);
    }
    console.log("Received leadId in MeetingInformationModalComponent", this.leadId);
    console.log('activityId:', this.activityId);
    this.patchFormValues(this.activityId);
    this.getMeetingStatuses();
   }

  // save(): void {
  //   if (this.meetingInformationForm.valid) {
  //     // Extract form values
  //     const formValues = this.meetingInformationForm.value;

  //     // Map the form values to the required format
  //     const meetingData: MeetingInformation = {
  //       meetingId: this.meetingId || 0, // Use the existing meetingId or 0 for a new meeting
  //       leadId:Number(this.leadId),
  //       title: formValues.title,
  //       startTime: formValues.startTime,
  //       endTime: formValues.endTime,
  //       location: formValues.location,
  //       participants: formValues.participants,
  //       agenda: formValues.agenda,
  //       notes: formValues.notes,
  //       isOnlineMeeting: formValues.onlineMeeting,
  //        createdAt: new Date().toISOString(), // Assuming current time for creation
  //       modifiedAt: new Date().toISOString(), // Assuming current time for modification
  //       deletedAt: null, // Assuming not deleted yet
  //       createdBy: null, // Replace with the actual current user
  //       modifiedBy: null, // Replace with the actual current user
  //       deletedBy: null, // Not deleted
  //       isDeleted: false // Not deleted
  //     };

  //     // Decide whether to add or update
  //     if (this.meetingId) {
  //       console.log(this.meetingId)
  //       // Update the existing meeting
  //       this.leadCreateService.updateMeeting(this.meetingId, meetingData).subscribe(
  //         () => {
  //           Swal.fire('Success', 'Meeting updated successfully', 'success');
  //         },
  //         error => {
  //           this.errorMessage = 'Failed to update meeting.';
  //           console.error(this.errorMessage, error);
  //         }
  //       );
  //     } else {
  //       console.log("meetingData", meetingData);
  //       // Add a new meeting
  //       this.leadCreateService.addMeeting(meetingData).subscribe(
  //         (response) => {
  //           Swal.fire('Success', 'Meeting added successfully', 'success');
  //           console.log(meetingData);
  //           console.log(response);
  //         },
  //         error => {
  //           this.errorMessage = 'Failed to add meeting.';
  //           console.error(this.errorMessage, error);
  //         }
  //       );
  //     }
  //   } else {
  //     this.errorMessage = 'Please fill out all required fields correctly.';
  //     console.log(this.errorMessage);
  //   }
  // }
  save(): void {
    this.submitted = true;

    if (this.meetingInformationForm.valid) {
      // Extract form values
      const formValues = this.meetingInformationForm.value;

      // Helper function to convert time to ticks
      const convertTimeToTimeSpan = (time: string): string => {
        const [hours, minutes] = time.split(':').map(Number);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
      };

      // Map the form values to the required format
      const meetingData: MeetingInformation = {
        meetingId: this.activityId || 0,
        leadId: Number(this.leadId),
        isOnlineMeeting: formValues.onlineMeeting ||formValues.isOnlineMeeting,
        title: formValues.title,
        status:formValues.status.name ||formValues.status,
        // startTime: convertTimeToTimeSpan(formValues.startTime),
        // endTime: convertTimeToTimeSpan(formValues.endTime),
        startTime: formValues.startTime,
        endTime: formValues.endTime,
        location: formValues.location,
        participants: formValues.participants,
        agenda: formValues.agenda,
        notes: formValues.notes,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        deletedAt: null,
        createdBy: null,
        modifiedBy: null,
        deletedBy: null,
        isDeleted: false,
        userId:this.userId,
        officeId: null,
        ActivityType: 'meeting',
      };
      console.log("activityId",this.activityId)
      // Decide whether to add or update
      if (this.activityId) {
        this.leadCreateService.updateMeeting(this.activityId, meetingData).subscribe(
          () => {
            Swal.fire('Success', 'Meeting updated successfully', 'success');
            this.activeModal.close('success');
            this.activityNotificationService.notifyActivitiesChange(); // Notify change
          },
          error => {
            this.errorMessage = 'Failed to update meeting.';
            console.error(this.errorMessage, error);
          }
        );
      } else {
        console.log(meetingData);
        this.leadCreateService.addMeeting(meetingData).subscribe(
          (response) => {
            Swal.fire('Success', 'Meeting added successfully', 'success');
            console.log(meetingData);
            console.log(response);
            this.activeModal.close('success');

            // window.location.reload();
            this.activityNotificationService.notifyActivitiesChange(); // Notify change
          },
          error => {
            this.errorMessage = 'Failed to add meeting.';
            console.error(this.errorMessage, error);
          }
        );
      }
    } else {
      this.meetingInformationForm.markAllAsTouched();
      return;
      // this.errorMessage = 'Please fill out all required fields correctly.';
      // console.log(this.errorMessage);
    }
  }


  private loadMeetingData(meetingId: number): void {
    this.leadCreateService.getMeeting(meetingId).subscribe(meeting => {
      this.meetingInformationForm.patchValue(meeting);
    }, error => {
      this.errorMessage = 'Failed to load meeting data.';
      console.error(this.errorMessage, error);
    });
  }
  patchFormValues(activityId: number): void {
    console.log("activityId", activityId);
  
    this.leadCreateService.getMeetingById(activityId).subscribe((meeting: any) => {
      console.log('Call patchValueData:', meeting);
       // Helper function to convert time to ticks
       const convertTimeToTimeSpan = (time: string): string => {
        const [hours, minutes] = time.split(':').map(Number);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
      };
      // Ensure that the properties match the meeting object structure
      this.meetingInformationForm.patchValue({
        meetingId: meeting.meetingId || 0, // Use meeting.meetingId from the API response
        leadId: Number(this.leadId),
        onlineMeeting: meeting.isOnlineMeeting,
        status:meeting.status,
        title: meeting.title, // Corrected from formValues to meeting
        // startTime: convertTimeToTimeSpan(meeting.startTime), // Corrected to meeting.startTime
        // endTime: convertTimeToTimeSpan(meeting.endTime), // Corrected to meeting.endTime
        startTime: meeting.startTime,// Ensure correct ISO format
        endTime: meeting.endTime, 
        location: meeting.location, // Corrected to meeting.location
        participants: meeting.participants, // Corrected to meeting.participants
        agenda: meeting.agenda, // Corrected to meeting.agenda
        notes: meeting.notes, // Corrected to meeting.notes
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        deletedAt: null,
        createdBy: meeting.createdBy || null, // Use actual data if available
        modifiedBy: meeting.modifiedBy || null, // Use actual data if available
        deletedBy: meeting.deletedBy || null, // Use actual data if available
        isDeleted: false,
        userId: meeting.userId || 19, // Use meeting.userId if available
        officeId: meeting.officeId || null,
        ActivityType: 'meeting' // This seems to be a constant
      });
    });
  }
  
  getMeetingStatuses(){
    this.leadCreateService.getMeetingStatuses().subscribe(
      (data: MeetingStatus[]) => {
        this.meetingStatuses = data
        console.log("MeetingStatuses", this.meetingStatuses)
      },
      (error) => console.error('Failed to fetch call statuses', error)
    );
  }
}
