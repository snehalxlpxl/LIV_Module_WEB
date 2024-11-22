import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivApproveService } from './liv-approve.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyInfo } from '../../customers/customer-create/customer-create-model/CustomerInfo';
import { CustomerCreateService } from '../../customers/customer-create/customer-create.service';
import { CreditLimitRequestModalService } from '../credit-limit-req-list/credit-limit-request-modal/credit-limit-request-modal.service';
import Swal from 'sweetalert2';
import { ActivityNotificationService } from 'app/Leads/lead-preview/lead-preview-activities-section/ActivityNotificationService.service';

@Component({
  selector: 'app-liv-approve',
  templateUrl: './liv-approve.component.html',
  styleUrls: ['./liv-approve.component.scss']
})
export class LivApproveComponent implements OnInit {

  CreditLimitReqForm: FormGroup;
  salePerson:any; // Populate this array with your salespersons data
  branch:any; // Populate this array with your branch data
  creditLimit:any // Populate this array with your credit limits data
  creditTerm:any; // Populate this array with your credit terms data
  isExistingCustomer: boolean = true; // Initially set to true or false as needed
  companies: CompanyInfo[];
  approverId: string;
  status: string;
 

  livrequestId: any;
  livdata: any[];
  userName: any;
  userId: any;

  constructor(private route: ActivatedRoute,
    private livApproveService:LivApproveService,
    private fb: FormBuilder,
    private apiService: CustomerCreateService,
    private CreditLimitSer: CreditLimitRequestModalService,
    private activityNotificationService: ActivityNotificationService // Inject service
) { }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
  } else {
      console.log('No user data found in localStorage');
  }
    // Retrieve the ID from the URL
    this.livrequestId =+ this.route.snapshot.paramMap.get('id');
    this.getLivdataById(this.livrequestId);
    this.route.queryParams.subscribe(params => {
      this.approverId = params['approID'];
      this.status = params['status'];
    });
    // You can now use livRequestId, approverId, and status as needed
    console.log('LivrequestId:', this.livrequestId);
    console.log('ApproverId:', this.approverId);
    console.log('Status:', this.status);
  }
  getLivdataById(id:any){
    this.livApproveService.livApproveById(id).subscribe(data=>{
      console.log(data);
      this.livdata=data;
      console.log(this.livdata[0].branchName)
      this.patchdata();
      this.loadSalesPerson();
      this.getCreditTerms();
      this.loadBranch();
      this.fetchCompanies();
    })


    this.CreditLimitReqForm = this.fb.group({
      isNewCustomer:[this.isExistingCustomer],
      salePersonId: ['', Validators.required],
      salePersonName: [''],
      customerId: [0], 
      customerName: [''],
      branchId: ['', Validators.required],
      branchName: [''],
      creditLimit: ['', Validators.required],
      creditTermId: ['', Validators.required],
      creditTermName: [''],
      note: ['']
    });
  }

  patchdata(){
    this.CreditLimitReqForm.patchValue({
      salePersonId:this.livdata[0].salesPersonId,
      salePersonName:this.livdata[0].salesPersonName ,
      customerId: this.livdata[0].customerId, 
      customerName: this.livdata[0].customerName,
      branchId: this.livdata[0].branchId,
      branchName:this.livdata[0].branchName,
      creditLimit: this.livdata[0].creditLimit,
      creditTermId: this.livdata[0].creditTerms,
      creditTermName: this.livdata[0].creditTerms,
      note: this.livdata[0].notes
    });
  }
  loadSalesPerson() {
    this.apiService.getSalesPerson().subscribe((data: any[]) => {
    
      this.salePerson = data;
      console.log("sales Person", this.salePerson);
    });
  }

  getCreditTerms() {
    this.apiService.getCreditDays().subscribe((data: any) => {
      this.creditTerm = data;
      console.log("credit ",this.creditTerm);
    });
  }
  loadBranch() {
    this.CreditLimitSer.getBranch().subscribe((data: any[]) => {
    
      this.branch = data;
      console.log("branch", this.branch);
    });
  }

  fetchCompanies(): void {
    this.apiService.getCompanies().subscribe(
      (data: CompanyInfo[]) => {
        this.companies = data;
      },
      (error: any) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  onsalePersonChange(event: any) {
  
    const selectedValue = event ? event.userDisplayName : '';
    this.CreditLimitReqForm.get('salePersonName').setValue(selectedValue);
  }

  onChangeBranch(event: any) {
    const selectedValue = event ? event.companyName : '';
    this.CreditLimitReqForm.get('branchName').setValue(selectedValue);
  }

  // onChangecreditLimit(event: any) {
  //   const selectedValue = event ? event.companyName : '';
  //   this.CreditLimitReqForm.get('companyName').setValue(selectedValue);

  // }

  onChangecreditTerm(event: any) {
    const selectedValue = event ? event.paymentTerm1 : '';
    this.CreditLimitReqForm.get('creditTermName').setValue(selectedValue);
  }

  onCompanyNameChange(event:any){
    const selectedValue = event ? event.companyName : '';
    this.CreditLimitReqForm.get('customerName').setValue(selectedValue);
  }

  patchCustomerIdName(){
    if (this.isExistingCustomer) {
      // If it's an existing customer, reset companyName and wait for user to select from the list
      this.CreditLimitReqForm.patchValue({
        customerId: 0,
        companyName: ''
      });
    } else {
      // If not an existing customer, reset customerId and allow input for companyName
      this.CreditLimitReqForm.patchValue({
        customerId: 0,
        companyName: ''
      });
    }
  }

  onSubmit() {
      // Use the actual request ID
    this.status= 'Approved';        // Use the actual status

    this.livApproveService.updateApprovalTask(this.livrequestId, this.status,'', this.userId)
      .subscribe(response => {
        console.log('API response:', response);
        this.activityNotificationService.notify('Credit limit request created successfully.');

        // window.location.reload();
      }, error => {
        console.error('Error occurred:', error);
      });
  
  }

  
  close() {
    // this.activeModal.dismiss();
  }
  
}
