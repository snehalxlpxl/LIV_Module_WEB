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
  livRequest:any = [];
  LIVRequestId:any;
  currentComponent: string;
  userName: any;
  userId: any; 
  isApprover : boolean=false;
  approverList = [113057, 113058, 113059, 113060, 113061, 113062];

  constructor(private navigationService: CustomerPreviewService, private modalService: NgbModal,private livRequestService: LivPreviewService, private livApproveService:LivApproveService,  private route: ActivatedRoute, private router: Router,private location: Location,  private activityNotificationService: ActivityNotificationService,    private changeDetector: ChangeDetectorRef) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit(): void {

    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
  } else {
      console.log('No user data found in sessionStorage');
  }
  this.isApprover = this.approverList.includes(this.userId);

    this.LIVRequestId = this.route.snapshot.paramMap.get('id');
   console.log("BasicDetailLIVRequestId",this.LIVRequestId);
  
    this.getLIVRequest(this.LIVRequestId);
    this.navigationService.component$.subscribe(component => {
      this.currentComponent = component;
    });

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
  openApproveModal(){
    const modalRef = this.modalService.open(ApproveModalComponent);

  }
  getLIVRequest(id: any): void {
    this.livRequestService.getLIVRequest(id).subscribe({
      next: (data) => {
        this.livRequest = data;
        console.log("GetLIVRequest",data); 
        // console.log(this.livRequest.salesPersonId);
        // this.fetchSalesPersonName(this.livRequest.salesPersonId);
        // this.fetchBranchName(this.livRequest.branchId)
      },
      error: (err) => console.error('Error fetching LIVRequest', err),
    });
  }
  status: string;
 
  onSubmit() {
    // Use the actual request ID
  this.status= 'Approved';        // Use the actual status

  this.livApproveService.updateApprovalTask(this.LIVRequestId, this.status,'',this.userId)
    .subscribe(response => {
      console.log('API response:', response);
      this.getLIVRequest(this.LIVRequestId);
      console.log("LIV request data updated+++++++++++++");
      this.activityNotificationService.notifyUpdateApprovalChange();
      this.changeDetector.detectChanges();
 
      // window.location.reload(); 
    }, error => {
      console.error('Error occurred:', error);
    });
 
  }

  cancelLivRequest(livReqId: number, userId: number) {
    console.log("livReqId=", livReqId);
    console.log("userId=", userId);
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
            this.getLIVRequest(livReqId);
          },
          (error) => {
            if (error.status === 200) {
              Swal.fire('Canceled!', 'LIV request has been canceled.', 'success');
            } else {
              Swal.fire('Error!', 'Failed to cancel LIV request.', 'error');
            }
          }
        );
      }
    });
  }

}
