export interface CallLogInformation {
    callId: number;
    leadId: number;
    title: string;
    callStatus: string;
    callType: string;
    subject: string;
    startTime: string;  // Use `string` for date-time or you can use `Date` type if you prefer
    endTime: string;    // Same as above
    callPurpose: string;
    callResult: string;
    callResultDetails: string;
    isMarkAsComplete: boolean;
    createdAt: string;  // Or `Date` if needed
    modifiedAt?: string; // Or `Date`
    deletedAt?: string; // Or `Date`, and it's optional since it could be null
    createdBy?: string;
    modifiedBy?: string;
    deletedBy?: string; // Optional
    isDeleted?: boolean;
    userId: number;
    officeId:number;
    ActivityType:string;
}
