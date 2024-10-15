export interface MeetingInformation {
    meetingId?: number;
    leadId?: number;
    isOnlineMeeting?: boolean;
    title?: string;
    status?:string;
    startTime?: string; // Adjust types as needed
    endTime?: string;
    location?: string;
    participants?: string;
    agenda?: string;
    notes?: string;
    createdAt?: string;
    modifiedAt?: string;
    deletedAt?: string;
    createdBy?: string;
    modifiedBy?: string;
    deletedBy?: string;
    isDeleted?: boolean;
    userId: number;
    officeId: number;
    ActivityType:string;

  }
  