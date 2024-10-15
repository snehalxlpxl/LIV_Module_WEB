import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerCreateService } from '../../../customers/customer-create/customer-create.service';
import { CreditLimitRequestModalService } from './credit-limit-request-modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyInfo } from '../../../customers/customer-create/customer-create-model/CustomerInfo';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-credit-limit-request-modal',
  templateUrl: './credit-limit-request-modal.component.html',
  styleUrls: ['./credit-limit-request-modal.component.scss']
})
export class CreditLimitRequestModalComponent implements OnInit {
  CreditLimitReqForm: FormGroup;
  salePerson:any; // Populate this array with your salespersons data
  branch:any; // Populate this array with your branch data
  creditLimit:any // Populate this array with your credit limits data
  creditTerm:any; // Populate this array with your credit terms data
  isExistingCustomer: boolean = true; // Initially set to true or false as needed
  companies: CompanyInfo[];
  userName: any;
  userId: any;
 
  constructor(private fb: FormBuilder,
  private apiService: CustomerCreateService,
  private CreditLimitSer: CreditLimitRequestModalService,
  public activeModal: NgbActiveModal,
  public toasterSer:ToastrService
  ) { }
 
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
      note: [''],
      createdBy:[this.userId]
    });
 
    this.loadSalesPerson();
    this.getCreditTerms();
    this.loadBranch();
    this.fetchCompanies();
    this.toggleCustomerType();
 
  }
  
  toggleCustomerTypeCheckbox(event: any) {
    this.isExistingCustomer = event.target.checked;
    this.toggleCustomerType(); // Update validation when checkbox is toggled
    this.patchCustomerIdName();
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
 
  toggleCustomerType() {
    // Get form controls to avoid multiple lookups and check if they exist
    const customerIdControl = this.CreditLimitReqForm.get('customerId');
    const companyNameControl = this.CreditLimitReqForm.get('companyName');
  
    if (customerIdControl && companyNameControl) {
      // Clear validators for both customerId and companyName
      customerIdControl.clearValidators();
      companyNameControl.clearValidators();
  
      // Conditionally add validators based on whether it's an existing customer
      if (this.isExistingCustomer) {
        customerIdControl.setValidators(Validators.required);
      } else {
        companyNameControl.setValidators(Validators.required);
      }
  
      // Re-validate form after setting new validators
      customerIdControl.updateValueAndValidity();
      companyNameControl.updateValueAndValidity();
    }
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
 
  onSubmit() {
    if (this.CreditLimitReqForm.invalid) {
      this.markFormAsTouched();
      return;
    }
    
    const data = this.CreditLimitReqForm.value;
    console.log('Form Submitted:', data);
    this.CreditLimitSer.createCreditLimitRequest(this.CreditLimitReqForm.value).subscribe((res: any) => {
      
      if(res){
        this.close();
        Swal.fire({
          title: 'Success!',
          text: 'Your credit limit request has been created successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
      
    }, (error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create credit limit request. Please try again.',
        icon: 'error'
      });
    });
  }
 
  markFormAsTouched() {
    Object.keys(this.CreditLimitReqForm.controls).forEach(field => {
      const control = this.CreditLimitReqForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
 
  close() {
    this.activeModal.dismiss();
  }
}
 
 