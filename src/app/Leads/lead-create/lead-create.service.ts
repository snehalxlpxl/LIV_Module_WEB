import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Lead } from './lead-create-model/Lead';
import { LeadStatus } from './LeadStatus';
import { MeetingInformation } from '../lead-preview/lead-preview-header/meeting-information-modal/MeetingInformation';
import { CallLogInformation } from '../lead-preview/lead-preview-header/call-log-modal/CallLogInformation';
import { ActivityDetails } from '../lead-preview/lead-preview-activities-section/ActivityDetails';
export interface LeadSource {
  name: string;
  id: number;
}

export interface CallPurpose {
  id: number;
  name: string;
}
export interface ServiceType {
  name: string;
  value: string;
}

export interface EmployeeCount {
  name: string;
  value: number;
}
export interface Industry {
  name: string;
  value: number;
}


export interface CallStatus {
  name: string;
  value: string;
}

export interface MeetingStatus {
  name: string;
  value: string;
}
export interface CallType {
  name: string;
  value: string;
}
export interface CallResult {
  id: number;
  name: string;
}
export interface Priority {
  id: number;
  name: string;
}

export interface Status {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})

export class LeadCreateService {
  // private apiUrl = 'http://localhost:5269/api/Leads';
  private apiUrl = `${environment.apiUrl}/Leads`;

  constructor(private http: HttpClient) { }
  getVwAllSalesPerson(): Observable<any> {
    return this.http.get(`${this.apiUrl}/VwAllSalesPerson`);
  }


  // Method to get all location master data
  getAllLocationMaster(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allLocationMaster`);
  }
  getLeadStatuses1(): Observable<LeadStatus[]> {
    return this.http.get<LeadStatus[]>(`${this.apiUrl}/LeadStatus`);
  }

  getLeadSources(): Observable<LeadSource[]> {
    return this.http.get<LeadSource[]>(`${this.apiUrl}/lead-sources`);
  }
  getMarketingSources(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetMarketingSources`);
  }

  getLeadStatuses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetLeadStatuses`);
  }
  getServiceTypes(): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(`${this.apiUrl}/service-types`);
  }
  getEmployeeCounts(): Observable<EmployeeCount[]> {
    return this.http.get<EmployeeCount[]>(`${this.apiUrl}/employee-counts`);
  }

  getCallStatuses(): Observable<CallStatus[]> {
    return this.http.get<CallStatus[]>(`${this.apiUrl}/call-status`);
  }
  getMeetingStatuses(): Observable<MeetingStatus[]> {
    return this.http.get<MeetingStatus[]>(`${this.apiUrl}/meeting-status`);
  }
  
  getCallTypes(): Observable<CallType[]> {
    return this.http.get<CallType[]>(`${this.apiUrl}/callType`);
  }
  getCallPurpose(): Observable<CallPurpose[]> {
    return this.http.get<CallPurpose[]>(`${this.apiUrl}/callPurpose`);
  }
  getcallResult(): Observable<CallResult[]> {
    return this.http.get<CallResult[]>(`${this.apiUrl}/callResult`);
  }

  getPriority(): Observable<Priority[]> {
    return this.http.get<Priority[]>(`${this.apiUrl}/priority`);
  }
  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.apiUrl}/status`);
  }


  // http://localhost:5269/api/Leads
  // http://localhost:5269/api/Leads/GetLeadStatusById/1

  // In lead.service.ts
getLeadStatusById(leadStatusId: number): Observable<LeadStatus> {
  return this.http.get<LeadStatus>(`${this.apiUrl}/GetLeadStatusById/${leadStatusId}`);
}
// http://localhost:5269/api/Leads/getLeadSourceById/2

getLeadSourceById(leadSourceId: number): Observable<LeadSource> {
  return this.http.get<LeadSource>(`${this.apiUrl}/getLeadSourceById/${leadSourceId}`);
}
  // Get lead by ID
  getLeadById(id: number): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiUrl}/getLeadById/${id}`);
  }

  // Create a new lead
  createLead(lead: Lead): Observable<Lead> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Lead>(`${this.apiUrl}/PostLead`, lead, httpOptions);
  }

  // Update a lead
  updateLead(id: number, lead: Lead): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<void>(`${this.apiUrl}/Update/${id}`, lead, httpOptions);
  }

  // Delete a lead
  deleteLead(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // Get all countries
  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetCountries`);
  }

  // Get states by country ID
  getStatesByCountryId(countryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${countryId}/States`);
  }
  // http://localhost:5269/api/Leads/Industry
 // Get Industry 
 getIndustries(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/Industry`);
}
getMeeting(meetingId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/LeadsMeeting/${meetingId}`);
}
// // Create a new meeting
addMeeting(meeting: MeetingInformation): Observable<MeetingInformation> {
     return this.http.post<MeetingInformation>(`${this.apiUrl}/CreateMeeting`, meeting);

}

// Update an existing meeting
updateMeeting(meetingId: any, meeting: MeetingInformation): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/UpdateMeeting/${meetingId}`, meeting);

}
updateCallLog(callLogId: any, callLog: CallLogInformation): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/UpdateCallLog/${callLogId}`, callLog);
}
addCallLog(callLog: CallLogInformation): Observable<CallLogInformation> {
  return this.http.post<CallLogInformation>(`${this.apiUrl}/CreateCallLog`, callLog);
}
getLeadOwner(leadOwnerId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/leadOwner/${leadOwnerId}`);
}
getCountryName(countryId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/Country/${countryId}`);
}
getStateName(stateId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/state/${stateId}`);
}
getActivities(id:any): Observable<ActivityDetails[]> {
  return this.http.get<ActivityDetails[]>(`${this.apiUrl}/get-activities/${id}`);
}
getCallLogById(activityId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/callLog/${activityId}`);
}
getTaskById(activityId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/task/${activityId}`);
}
getMeetingById(activityId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/meeting/${activityId}`);
}

deleteActivity(activityId: number, activityType: string): Observable<any> {
  let endpoint = '';

  switch (activityType) {
    case 'task':
      endpoint = `${this.apiUrl}/${activityId}/taskDelete`;
      break;
    case 'meeting':
      endpoint = `${this.apiUrl}/${activityId}/meetingDelete`;
      break;
    case 'call':
      endpoint = `${this.apiUrl}/${activityId}/callLogDelete`;
      break;
    default:
      throw new Error('Invalid activity type');
  }

  return this.http.put(endpoint, {});
}



}

