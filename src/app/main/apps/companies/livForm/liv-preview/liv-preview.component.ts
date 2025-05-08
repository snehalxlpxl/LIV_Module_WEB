import { Component, OnInit,ChangeDetectorRef, Input } from '@angular/core';
import { CustomerPreviewService } from '../../customers/customer-preview.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RejectModalComponent } from './reject-modal/reject-modal.component';
import { ApproveModalComponent } from './approve-modal/approve-modal.component';
import { LivPreviewService } from './liv-preview.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LivApproveService } from '../liv-approve/liv-approve.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'app/auth/models';
import { Location } from '@angular/common'; // Import the Location service
import Swal from 'sweetalert2';
import { ActivityNotificationService } from 'app/Leads/lead-preview/lead-preview-activities-section/ActivityNotificationService.service';
import { CreditLimitReqListComponent } from '../credit-limit-req-list/credit-limit-req-list.component';
import { CreditLimitReqListService } from '../credit-limit-req-list/credit-limit-req-list.service';
import { ConstantPool } from '@angular/compiler';
import { forkJoin, of } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CreditLimitRequestModalService } from '../credit-limit-req-list/credit-limit-request-modal/credit-limit-request-modal.service';
import { CreditLimitRequestModalComponent } from '../credit-limit-req-list/credit-limit-request-modal/credit-limit-request-modal.component';
import { LivPreviewTimelineSectionService } from '../liv-preview-overview-section/liv-preview-timeline-section/liv-preview-timeline-section.service';
import { RevisionModalComponent } from './revision-modal/revision-modal.component';


@Component({
  selector: 'app-liv-preview',
  templateUrl: './liv-preview.component.html',
  styleUrls: ['./liv-preview.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LivPreviewComponent implements OnInit {
  isSubmitted = false;

  loading: boolean = true;
  taskTimeLineData: any;
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  public get currentUserValue(): User {
    console.log("this.currentUserSubject.value", this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }
  livRequestData: any;

  finalStatus:string;
  livRequest:any = [];
   livRequestSubject = new BehaviorSubject<any>(this.livRequest);
  LIVRequestId:any;
  currentComponent: string;
  userName: any;
  userId: any; 
  // @Input() taskTimeLineData: any[] = [];

  // isApprover : boolean=false;
  // approverList = [113057, 113058, 113059, 113060, 113061, 113062];
  isCanceledStatus:any;

  constructor(private navigationService: CustomerPreviewService, private modalService: NgbModal,private livRequestService: LivPreviewService, private livApproveService:LivApproveService,  private route: ActivatedRoute, 
    private router: Router,private location: Location,  private activityNotificationService: ActivityNotificationService,    private changeDetector: ChangeDetectorRef,private CreditLimitReqListSer:CreditLimitReqListService,    
    private http: HttpClient,private livPreviewService:LivPreviewService,private CreditLimitSer:CreditLimitRequestModalService,  private timelineService: LivPreviewTimelineSectionService,  private cdr: ChangeDetectorRef // Inject ChangeDetectorRef

  ) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit(): void {
    
    this.activityNotificationService.activity$.subscribe((message: string) => {
      if (message === 'LIV request canceled successfully.' || message === 'Approval task updated successfully.') {
        // this.loadLIVRequests(); // Method to refresh the list or data
        console.log("notify--------------------------------------init");
        this.refreshLIVRequestData();
       

      }
    });
    this.livRequestSubject.subscribe((livRequest) => {
      console.log('Updated livRequest:', livRequest);
      this.livRequest = livRequest;
      console.log('Task Timeline Data for tab:+++++++++++++++++++++', this.taskTimeLineData);
    });

    const userData = JSON.parse(localStorage.getItem('currentUser'));

    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
      // this.isApprover = this.approverList.includes(this.userId);
      // console.log("approver:",this.isApprover)
      // this.checkIfDelegate(this.userId,this.LIVRequestId);
      
      this.LIVRequestId = this.route.snapshot.paramMap.get('id');
      console.log(this.LIVRequestId);
      this.getAllData(this.LIVRequestId);
      this.checkUserSalesPersonOrCreatedBy( this.userId,this.LIVRequestId);
      this.checkUserSalesPersonOrCreatedByApprover(this.userId,this.LIVRequestId )
      // this.loadLIVApprovalTasks(this.userId,this.LIVRequestId);
      this.finalStatus=this.livRequest.status;
      console.log("ng oninit this.finalStatus=",this.livRequest.status);
      // this.checkLevelStatus(this.LIVRequestId,this.userId);
      // this.getDelegatesApprover(this.LIVRequestId);

    } else {
        console.log('No user data found in sessionStorage');
    }
  
    // this.isApprover = this.approverList.includes(this.userId);
    // console.log("approver:",this.isApprover)

    this.LIVRequestId = this.route.snapshot.paramMap.get('id');
    // this.loadLIVApprovalTasks(this.userId,this.LIVRequestId);
     this.checkIfDelegate(this.userId,this.LIVRequestId);
    
    // this.checkLevelStatus(this.LIVRequestId,this.userId);
    this.getDelegatesApprover(this.LIVRequestId);
    //  console.log("BasicDetailLIVRequestId",this.LIVRequestId);
  
  
    this.getLIVRequest(this.LIVRequestId);
    if(this.LIVRequestId){
    this.router.navigate([`/liv-preview/${this.LIVRequestId}`]).then(() => {
      // window.location.reload();
      this.cdr.detectChanges();
    });

    this.GetButtonRightsProc(this.userId,this.LIVRequestId);
  }
    
    this.isCanceledStatus=this.getLIVRequest(this.LIVRequestId);

    this.navigationService.component$.subscribe(component => {
      this.currentComponent = component;
    });

    // Subscribe to refresh notifications
    this.activityNotificationService.refreshData$.subscribe(() => {
      // this.loadData(); // Reload data when notified
    });
    
  }  

  buttonRights: any = {}; // Store API response
  isEdit: boolean = false;
  isReject: boolean = false;
  isRevise: boolean = false;
  isApprove: boolean = false;
  isCancel: boolean = false;
  GetButtonRightsProc(userId: number, livId: number) {
    this.livPreviewService.GetButtonRightsProc(userId,livId).subscribe(response => {
      
      console.log("button status",response);
      if (response.length > 0) {
        let permissions = response[0]; // Assuming only one object per user
        this.userId = permissions.userId;
        this.isEdit = permissions.isEdit;
        this.isReject = permissions.isReject;
        this.isRevise = permissions.isRevise;
        this.isApprove = permissions.isApprove;
        this.isCancel = permissions.isCancel;
      }
    });
  }

refreshLIVRequestData() {
  // This function will reload or refresh the current LIV request data
  this.getLIVRequest(this.LIVRequestId); // Assuming getLIVRequest is the method you use to fetch data
  console.log("notify--------------------------------------init");
}
  getLivTaskTimeLine(taskId: number) {
    const url = `${environment.apiUrl}/LIVTimeLine/GetLivTaskTimeLine/${taskId}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    console.error('Error:', error);
    return [];
  }
 
  getAllData(LIVRequestId: any): void {
    console.log("BasicDetailgetAllDataLIVRequestId---------------", this.LIVRequestId);

    const livRequest$ = this.livRequestService.getLivrequestById(LIVRequestId);
    const taskTimeLine$ = this.getLivTaskTimeLine(LIVRequestId);
    forkJoin([livRequest$, taskTimeLine$
      // , sumRevenue$, realizedRevenue$, companyCount$
    ])
      .subscribe({
        next: ([livRequestData,taskTimeLineData
          // , sumRevenueData, realizedRevenueData, companyCountData
          ]) => {
          this.livRequestData = livRequestData;
          this.taskTimeLineData = taskTimeLineData; 
  
          console.log('Fetched LivRequest Data:', this.livRequestData);
          console.log('Fetched Task TimeLine Data:', taskTimeLineData);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }
  isDelegate: boolean = false;
  message:string;
  checkIfDelegate(userId: number,livId:number) {
    this.CreditLimitReqListSer.isDelegate(userId).subscribe(response => {
      this.isDelegate = response.isDelegate;
      console.log("this.isDelegate",this.isDelegate);

      if(this.isDelegate==true){
        // this.isDelegate=true;
        this.CreditLimitReqListSer.getDelegatesApprover(userId).subscribe(response => {
          this.message=`You have logged in as delegate for Mr. `+response[0].approverName;
          });
          
        this.loadLIVApprovalTasks(this.userId,livId);

      }else{
        this.loadLIVApprovalTasks(this.userId,livId);
      
      }
      console.log('Is Delegate:', this.isDelegate); // For debugging
    });
  }

  approvalTasks: any[] = [];
  ApprovalLevelStatus:any;
  showApprovalbtn=false;
  levelStatusFlag=false;
  loadLIVApprovalTasks(userId: number, LIVRequestId: number): void {
    this.loading = true;
    this.livRequestService.getLIVApprovalTasks(userId, LIVRequestId).subscribe(
      (tasks) => {
        this.loading = false;
        this.approvalTasks = tasks;
        console.log('Approval Tasks line 136:', tasks);
        console.log("this.livRequest.Status",this.livRequest.status);
        if( this.approvalTasks){
          // console.log("^^^^^^^^^^^^^^^^",this.approvalTasks);
          this.ApprovalLevelStatus=this.approvalTasks[0].levelStatus;
          this.showApprovalbtn=true;
          console.log("this.ApprovalLevelStatus",this.ApprovalLevelStatus);
          if(this.showApprovalbtn==true){
          if(this.ApprovalLevelStatus=='Approved' || this.ApprovalLevelStatus=='Canceled'||this.ApprovalLevelStatus=='Rejected'||this.ApprovalLevelStatus==''){
            this.levelStatusFlag=true;
            // console.log("this.levelStatusFlag",this.levelStatusFlag);
          }else{
            this.levelStatusFlag=false;
          }
        }else{
          // console.log("================",this.approvalTasks);
          if(this.livRequest.status=='Approved'){
            this.levelStatusFlag=true;
          }
        }
        // else if(this.showApprovalbtn==false){
        //   // this.showApprovalbtn=false;
        //   this.levelStatusFlag=true;
        //   console.log("=============",this.levelStatusFlag=true)
        // }
          

        }else {
          // console.log("yyyyyyyyyyyyyyyyyyy")
          this.levelStatusFlag=true;
          this.showApprovalbtn=true;
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching approval tasks:', error);
      }
    );
  }

  goBack(): void {
    this.location.back(); // Go back to the previous page
    this.setComponent("overview");
  }
  setComponent(component: string) {
    this.navigationService.setComponent(component);
  }
  openRejectModal() {
    const modalRef = this.modalService.open(RejectModalComponent);
    modalRef.componentInstance.LIVRequestId = this.LIVRequestId;
  // Listen for the rejection confirmation event
  modalRef.componentInstance.rejectConfirmed.subscribe(() => {
    this.levelStatusFlag = true; // Adjust the flag to remove the button
    this.activityNotificationService.notify('Approval task updated successfully.');
  });
  this.activityNotificationService.notifyUpdateApprovalChange();
  }
  openRevisionModal(){
    const modalRef = this.modalService.open(RevisionModalComponent);
    modalRef.componentInstance.LIVRequestId = this.LIVRequestId;
  // Listen for the rejection confirmation event
  // modalRef.componentInstance.rejectConfirmed.subscribe(() => {
  //   this.levelStatusFlag = true; // Adjust the flag to remove the button
  //   this.activityNotificationService.notify('Approval task updated successfully.');
  // });
  this.activityNotificationService.notifyUpdateApprovalChange();
  
  }

  openApproveModal(LIVRequestId: number){
    const modalRef = this.modalService.open(ApproveModalComponent);
    // Pass the LIVRequestId to the modal instance
    modalRef.componentInstance.livRequestId = LIVRequestId;
    this.activityNotificationService.notify('Approval task updated successfully.');

    this.activityNotificationService.notifyUpdateApprovalChange();

    this.router.navigate([`/liv-preview/${LIVRequestId}`]).then(() => {
      // window.location.reload();
      this.cdr.detectChanges();
    });

  }
  
  // error:true;

  getLIVRequest(id: any): void {

    console.log("notify--------------------------------------init inside func");
    // this.isApprover = this.approverList.includes(this.userId);
    this.livRequestService.getLIVRequest(id).subscribe({
      next: (data) => {
        // if (this.isApprover ) {
          this.livRequest = data;
          console.log("GetLIVRequest1", data);
         
          this.finalStatus=this.livRequest.status;
          console.log("finalStatus", this.finalStatus);
          this.router.navigate([`/liv-preview/${id}`]).then(() => {
            // window.location.reload();
            this.cdr.detectChanges();
          });
        // }else if(data.createdBy === this.userId){
        //   this.livRequest = data;
        //   console.log("GetLIVRequest", data);
        // } else {
        //   this.error = true;
        //   console.log('No matching LIV request found for createdBy:', this.userId);
        //   // this.router.navigate(['/pages/miscellaneous/error']);
        // }
      }
      ,
      error: (err) => {
        console.error('Error fetching LIVRequest', err);
      },
    });
  }

  

  status: string;
  onSubmit() {

    if(this.isDelegate==true){
      this.openApproveModal(this.LIVRequestId)
    }else{
          // Use the actual request ID
    this.status= 'Approved';        // Use the actual status
    console.log(this.LIVRequestId, this.status, '', this.userId)
    this.livApproveService.updateApprovalTask(this.LIVRequestId, this.status, '', this.userId)
    .subscribe(response => {
      console.log('API response:', response);

      // Call the method to refresh the data after approval
      this.getLIVRequest(this.LIVRequestId);
      this.getLivTaskTimeLine(this.LIVRequestId);
      // console.log("LIV request data updated+++++++++++++");

      // Notify about the approval change
      this.activityNotificationService.notifyUpdateApprovalChange();
      // this.cdr.detectChanges();
      this.activityNotificationService.notify('Approval task updated successfully.');

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Request has been Approved Successfully.',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          // Set the flag to true after submission
          this.isSubmitted = true;
          
          // Navigate first, then reload after navigation completes
          this.router.navigate([`/liv-preview/${this.LIVRequestId}`]).then(() => {
            window.location.reload();
            this.cdr.detectChanges();
          });
        }
      });
     

      this.activityNotificationService.notify('Approval task updated successfully.');
      this.getLIVRequest(this.LIVRequestId);


    }, error => {
      console.error('Error occurred:', error);

      // Show error SweetAlert if API call fails
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update the Approval Request.',
        confirmButtonText: 'Try Again'
      });
      this.activityNotificationService.notify('Approval task failed.');

    });
    }
  
 
  }
  
 

  cancelLivRequest(livReqId: number, userId: number) {
    // console.log("livReqId=", livReqId);
    // console.log("userId=", userId);
    const updatedLivRequest = { ...this.livRequest, isDeleted: 1, status: 'Canceled' };
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this LIV request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.livRequestService.cancelLivRequest({ LivrequestId: livReqId, UserId: userId }).subscribe(
          (response) => {
            Swal.fire('Canceled!', 'LIV request has been canceled.', 'success');
            
            this.isSubmitted = true;
            this.activityNotificationService.notifyUpdateApprovalChange();

            this.activityNotificationService.notify('LIV request canceled successfully.');
            this.getLIVRequest(livReqId);
            this.cdr.detectChanges();
            window.location.reload();
          },
          (error) => {
            if (error.status === 200) {
              Swal.fire('Canceled!', 'LIV request has been canceled.', 'success');
              window.location.reload();
              this.activityNotificationService.notifyUpdateApprovalChange();

              this.activityNotificationService.notify('LIV request canceled successfully.');

              this.livRequestSubject.next(updatedLivRequest); //change detection
              this.cdr.detectChanges();
            } else {
              Swal.fire('Error!', 'Failed to cancel LIV request.', 'error');
            }
          }
        );
      }
    });
  }

  taskStatus:any;
  checkLevelStatus(userId,livRequestId){
    this.livRequestService.getLIVApprovalTaskStatus(userId,livRequestId).subscribe(
    (status) => {
      console.log('Task Status:', status);
      this.taskStatus=status;
    },
    (error) => {
      console.error('Error fetching task status:', error);
    }
  );
  }

  getDelegatesApprover(LIVRequestId:number){
    this.CreditLimitReqListSer.getDelegatesApprover(this.userId).subscribe(
      (delegates: any[]) => {
        var id=delegates[0].approverId;
        console.log('Delegates:', delegates,);
        this.checkLevelStatus(LIVRequestId,id)
      },
      (error) => {
        console.error('Error fetching delegates:', error);
      }
    );
  }

  isSalesPersonOrCreatedBy: boolean = false;
  StatusFlag=false;
  checkUserSalesPersonOrCreatedBy(userId: number, LIVRequestId: number) {
    
    this.livRequestService.checkUserSalesPersonOrCreatedBy(userId,LIVRequestId)
      .subscribe(
        (response) => {
          console.log('check salesPerson API Response:', response);
          // Set the isSalesPerson flag based on response
          if (response && response.request) {
            this.isSalesPersonOrCreatedBy = true;  // Set flag to true if user is a salesperson or creator
            this.getLIVRequest(LIVRequestId);
            console.log("this.livRequest.status",this.finalStatus)
                if(this.finalStatus=='Awaiting Approval'){
                  
                  this.StatusFlag=true;
                  console.log("this.livRequest.status========",this.StatusFlag)
                }
          
            // this.loadLIVApprovalTasks(userId,LIVRequestId);
            
          } else {
            this.isSalesPersonOrCreatedBy = false;  // Otherwise, set flag to false
          }
        },
        (error) => {
          console.error('Error occurred:', error);
          this.isSalesPersonOrCreatedBy = false;  // Handle the error case by resetting the flag
        }
      );
  }

  isSaleOrCreatedByApprover = false; // This flag will store the result of whether the user is an approver
  requestData: any;
  checkUserSalesPersonOrCreatedByApprover(userId:number,LIVRequestId:number){
    this.livRequestService.checkUserSalesPersonOrCreatedByApprover(userId, LIVRequestId)
      .subscribe(
        (response) => {
          console.log('checkUserSalesPersonOrCreatedByApprover:', response);

          this.isSaleOrCreatedByApprover = true; // Set the flag if API call is successful
          this.requestData = response.request; // Store request data
          // this.loadLIVApprovalTasks(userId,LIVRequestId);
          if(this.isSaleOrCreatedByApprover==true){
            if(this.livRequest.status=='Awaiting Approval'){
              this.levelStatusFlag=true;
            }
        }
        },
        (error) => {
          console.error('Error from API:', error);
          this.isSaleOrCreatedByApprover = false; // If there's an error, the user is not an approver
        }
      );
  }
  
  deleteLIVApprovalTask(id: number,userId:number,revisionStatus:any): void {
    this.livRequestService.deleteLIVApprovalTask(id,userId,revisionStatus).subscribe({
      next: (response) => {
        console.log('Task deleted successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Request Revised',
          text: 'The request has Revised successfully!',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/credit-limit-req-list']); // Navigate after confirmation
        });
        // alert('LIV approval task deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        alert('Failed to delete the LIV approval task.');
      }
    });
  }

  loadLivTaskTimeLine(livRequestId: any): void {
    // console.log("loadLivTaskTimeLine call"+rowData.livRequestId);
    // console.log("taskId:", rowData.livRequestId);
    // console.log("row call",rowData);

    this.timelineService.getLivTaskTimeLine(livRequestId).subscribe(
      data => {
        console.log("API Response Data:", data);
        console.log(data[0].levelStatus)
      if (data.length === 1) {
        const levelStatus = data[0]?.levelStatus?.trim(); // Trim to remove extra spaces

        console.log("levelStatus:", levelStatus);
        
        if (levelStatus === "Approved") { // Corrected comparison
          console.warn("Record is already approved. Modal will not open.");
          Swal.fire({
            icon: 'info',
            title: 'Already Approved',
            text: 'This request has already been approved.',
            confirmButtonColor: '#007bff'
          });
          return;
       
        }
        console.log("Only one record found, opening modal...");
        this.openCreditLimitReqModal(livRequestId);
      } else {
        if(this.finalStatus=="Approved"){
          this.openLIVModalForApprovedStatus(livRequestId);
        }else{
          console.warn("More than one record found, modal will not open.");
          Swal.fire({
            icon: 'warning',
            title: 'This request has been process, you can not edit',
            confirmButtonColor: '#dc3545'
          });
        }
        
        
      }
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
   openCreditLimitReqModal(livRequestId: any) {
      const modalRef = this.modalService.open(CreditLimitRequestModalComponent);
      modalRef.componentInstance.livRequestData = livRequestId;  // Passing data to modal
  
    }

  livoldStatus:any;
  openLIVModalForApprovedStatus(livrequestId: any) {
    console.log("rowData",livrequestId);
    this.livPreviewService.getLIVRequest(livrequestId).subscribe((data) => {
      console.log("livRequestData approve++++++++++++++++++++++", data);
      this.livoldStatus=data.status;
      this.CreditLimitSer.CheckCustomerExistsApprove(this.livoldStatus,livrequestId).subscribe((exists: boolean) => {
        console.log('Customer exists with Approve status:', exists);
        if (exists) {
          console.log("exist with approve status",exists);
          this.CheckForOldLIVRequest(livrequestId);

        } 
      });
    

    });
  }
  CheckForOldLIVRequest(livrequestId:any){
        this.CreditLimitSer.CheckOldLivRequest(livrequestId).subscribe((exists: boolean) => {
          console.log('Old Request exists:', exists);
          if (exists) {
            console.log("Old Request exists ---------",exists)
            Swal.fire({
              title: 'Error!',
              text: 'LIV Request Already in process',
              icon: 'error'
            });
            this.activityNotificationService.notify('Failed to create LIV Request.');
          }
          else{
            const modalRef = this.modalService.open(CreditLimitRequestModalComponent);
            modalRef.componentInstance.livRequestDataApprove = livrequestId;  // Passing data to modal
          }
        });
  }
}
