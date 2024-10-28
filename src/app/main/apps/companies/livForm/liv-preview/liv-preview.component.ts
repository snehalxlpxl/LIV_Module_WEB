import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
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
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  public get currentUserValue(): User {
    console.log("this.currentUserSubject.value", this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }
  finalStatus:string;
  livRequest:any = [];
   livRequestSubject = new BehaviorSubject<any>(this.livRequest);
  LIVRequestId:any;
  currentComponent: string;
  userName: any;
  userId: any; 
  // isApprover : boolean=false;
  // approverList = [113057, 113058, 113059, 113060, 113061, 113062];
  isCanceledStatus:any;

  constructor(private navigationService: CustomerPreviewService, private modalService: NgbModal,private livRequestService: LivPreviewService, private livApproveService:LivApproveService,  private route: ActivatedRoute, private router: Router,private location: Location,  private activityNotificationService: ActivityNotificationService,    private cdr: ChangeDetectorRef,private CreditLimitReqListSer:CreditLimitReqListService) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit(): void {
    this.livRequestSubject.subscribe((livRequest) => {
      console.log('Updated livRequest:', livRequest);
      this.livRequest = livRequest;
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
      console.log(this.LIVRequestId)
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
    
    
    this.isCanceledStatus=this.getLIVRequest(this.LIVRequestId);

    this.navigationService.component$.subscribe(component => {
      this.currentComponent = component;
    });

  }

  isDelegate: boolean = false;
  message:string;
  checkIfDelegate(userId: number,livId:number) {
    this.CreditLimitReqListSer.isDelegate(userId).subscribe(response => {
      this.isDelegate = response.isDelegate;
      console.log("this.isDelegate",this.isDelegate);

      if(this.isDelegate==true){

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
   
    this.livRequestService.getLIVApprovalTasks(userId, LIVRequestId).subscribe(
      (tasks) => {
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
          console.log("yyyyyyyyyyyyyyyyyyy")
          this.levelStatusFlag=true;
          this.showApprovalbtn=true;
        }
      },
      (error) => {
        console.error('Error fetching approval tasks:', error);
      }
    );
  }

  goBack(): void {
    this.location.back(); // Go back to the previous page
  }
  setComponent(component: string) {
    this.navigationService.setComponent(component);
  }
  openRejectModal() {
    const modalRef = this.modalService.open(RejectModalComponent);
    modalRef.componentInstance.LIVRequestId = this.LIVRequestId;
    // modalRef.result.then(
    //   (result) => {
    //     console.log('Modal closed with reason:', result);
    //   },
    //   (reason) => {
    //     console.log('Modal dismissed:', reason);
    //   }
    // );

  }
  openApproveModal(LIVRequestId: number){
    const modalRef = this.modalService.open(ApproveModalComponent);
    // Pass the LIVRequestId to the modal instance
    modalRef.componentInstance.livRequestId = LIVRequestId;
  }
  
  // error:true;

  getLIVRequest(id: any): void {
    // this.isApprover = this.approverList.includes(this.userId);
    this.livRequestService.getLIVRequest(id).subscribe({
      next: (data) => {
        // if (this.isApprover ) {
          this.livRequest = data;
          console.log("GetLIVRequest1", data);
          this.finalStatus=this.livRequest.status;
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
    // Use the actual request ID
  this.status= 'Approved';        // Use the actual status

  this.livApproveService.updateApprovalTask(this.LIVRequestId, this.status, '', this.userId)
    .subscribe(response => {
      console.log('API response:', response);

      // Call the method to refresh the data after approval
      this.getLIVRequest(this.LIVRequestId);
      // console.log("LIV request data updated+++++++++++++");

      // Notify about the approval change
      this.activityNotificationService.notifyUpdateApprovalChange();

      // Show success SweetAlert after successful API call
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Approval task updated successfully.',
        confirmButtonText: 'OK'
      });

      // Optional: Reload the page or just update the necessary parts
      window.location.reload(); 
    }, error => {
      console.error('Error occurred:', error);

      // Show error SweetAlert if API call fails
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update the approval task.',
        confirmButtonText: 'Try Again'
      });
    });
 
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
            window.location.reload();
            this.getLIVRequest(livReqId);
          },
          (error) => {
            if (error.status === 200) {
              Swal.fire('Canceled!', 'LIV request has been canceled.', 'success');
              // window.location.reload();
              this.livRequestSubject.next(updatedLivRequest); //change detection
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
            this.cdr.detectChanges();

            console.log("this.livRequest.status",this.finalStatus)
                if(this.finalStatus=='Awaiting Approval'){
                  this.cdr.detectChanges();

                  this.StatusFlag=true;
                  console.log("this.livRequest.status========",this.StatusFlag)
                }
          
            // this.loadLIVApprovalTasks(userId,LIVRequestId);
            
          } else {
            this.isSalesPersonOrCreatedBy = false;  // Otherwise, set flag to false
            this.cdr.detectChanges();

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
          this.cdr.detectChanges();

          if(this.isSaleOrCreatedByApprover==true){
            if(this.livRequest.status=='Awaiting Approval'){
              this.levelStatusFlag=true;
              this.cdr.detectChanges();

            }
        }
        },
        (error) => {
          console.error('Error from API:', error);
          this.isSaleOrCreatedByApprover = false; // If there's an error, the user is not an approver
        }
      );
  }
  
  


}
