import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerCreateService } from '../../../customers/customer-create/customer-create.service';
import { CreditLimitRequestModalService } from './credit-limit-request-modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyInfo } from '../../../customers/customer-create/customer-create-model/CustomerInfo';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ViewChild, ElementRef } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CreditLimitReqListService } from '../credit-limit-req-list.service';
import { Router } from '@angular/router';
import { ActivityNotificationService } from 'app/Leads/lead-preview/lead-preview-activities-section/ActivityNotificationService.service';
import { LivPreviewService } from '../../liv-preview/liv-preview.service';


@Component({
  selector: 'app-credit-limit-request-modal',
  templateUrl: './credit-limit-request-modal.component.html',
  styleUrls: ['./credit-limit-request-modal.component.scss']
})
export class CreditLimitRequestModalComponent implements OnInit {
  CreditLimitReqForm: FormGroup;
  salePerson: any; // Populate this array with your salespersons data
  branch: any; // Populate this array with your branch data
  creditLimit: any // Populate this array with your credit limits data
  creditTerm: any; // Populate this array with your credit terms data
  isExistingCustomer: boolean = true; // Initially set to true or false as needed
  companies: CompanyInfo[];
  userName: any;
  userId: any;
  isSubmitting: boolean = false; // Flag to track button state
  frequency = [{name:'Project'},{name:'Regular'}];


  @ViewChild('customerId') customerIdField!: NgSelectComponent;
  @ViewChild('branchId') branchIdField!: NgSelectComponent;
  @ViewChild('note') noteField!: ElementRef;
  @ViewChild('creditLimit') limitField!: ElementRef;
  @Input() livRequestData: any;  // Receiving data from parent component
  @Input() livRequestDataApprove:any;
  nextDecemberDate: any;
  livoldStatus:any;


  constructor(private fb: FormBuilder,private cd:ChangeDetectorRef,
    private apiService: CustomerCreateService,
    private CreditLimitSer: CreditLimitRequestModalService,
    public activeModal: NgbActiveModal,
    public toasterSer: ToastrService,
    private creditLimitReqListSer: CreditLimitReqListService,
    private router: Router,
    private activityNotificationService: ActivityNotificationService,// Inject service
    private creditLimitRequestModalService: CreditLimitRequestModalService,
    private livPreviewService: LivPreviewService,
   

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
      livrequestId:0,
      isNewCustomer: [this.isExistingCustomer],
      // isNewCustomer: true,
      salePersonId: ['', Validators.required],
      frequency:'',
      salePersonName: [''],
      customerId: [0],
      customerName: ['', Validators.required],
      branchId: ['', Validators.required],
      branchName: [''],
      creditLimit: ['', Validators.required],
      creditTermId: ['', Validators.required],
      creditTermName: [''],
      note: ['', Validators.required],
      createdBy: [this.userId],
      expectedTurnover: [null, Validators.required],
      expectedProfit: [null, Validators.required],
      profitPercentage: [0],
      expiryDate: [''],
      segment:[''],
      oldLivrequestId:0
    });

    this.loadSalesPerson();
    this.getCreditTerms();
    this.loadBranch();
    this.fetchCompanies();
    this.fetchNextDecemberDate();
   
    this.toggleCustomerType();
    if (this.livRequestData) {
      this.livPreviewService.getLIVRequest(this.livRequestData).subscribe((livRequest) => {
        console.log("livRequestData++++++++++++++++++++++", this.livRequestData);

        console.log('Received creditTermId:', livRequest.creditTermId);
        console.log('Received salePersonId:', livRequest.salesPersonId);
        console.log('Received LIV request data:', livRequest);
        this.apiService.getCreditTermIdByName(livRequest.creditTerms).subscribe((response) => {
          console.log('Received creditTermId:+++++++++++', response.creditTermId);
          this.CreditLimitReqForm.patchValue({
            creditTermId: response.creditTermId || '',
            // creditTermName: livRequest.creditTerms || ''
          });
          // Use the received creditTermId as needed
        });
        this.CreditLimitReqForm.patchValue({
          isNewCustomer: livRequest.isNewCustomer || false,
          salePersonId: livRequest.salesPersonId || '',
          salePersonName: livRequest.salesPersonName || '',
          customerId: livRequest.customerId || 0,
          customerName: livRequest.customerName || '',
          branchId: livRequest.branchId || '',
          branchName: livRequest.branchName || '',
          creditLimit: livRequest.creditLimit || '',
          // creditTermId: creditTermId || '',
          creditTermName: livRequest.creditTerms || '',
          note: livRequest.notes || '',
          createdBy: livRequest.createdBy,
          expectedTurnover: livRequest.expectedTurnover || 0,
          expectedProfit: livRequest.expectedProfit || 0,
          profitPercentage: livRequest.profitPercentage || 0,
          frequency:livRequest.frequency ||'',
          expiryDate: this.formatDate(livRequest.expiryDate) || '',
          segment:livRequest.segment
        });
      });

    }
    if(this.livRequestDataApprove){
      console.log("livRequestDataApprove ------------",this.livRequestDataApprove);
      this.patchLIVData(this.livRequestDataApprove);
    }

  }
  patchLIVData(id:any){
    this.livPreviewService.getLIVRequest(id).subscribe((data) => {
      console.log("livRequestData approve++++++++++++++++++++++", data);
      this.livoldStatus=data.status;
      this.CreditLimitReqForm.patchValue({
        isNewCustomer: data.isNewCustomer || false,
        salePersonId: data.salesPersonId || '',
        salePersonName: data.salesPersonName || '',
        customerId: data.customerId || 0,
        customerName: data.customerName || '',
        branchId: data.branchId || '',
        branchName: data.branchName || '',
        frequency: data.frequency || '',
        
      });

      console.log("updated",this.CreditLimitReqForm.value);
    });
   
  }
  creditLimitExceeds: boolean = false;
  formatCreditLimitnew(event: any, formControl: AbstractControl): void {
    const rawValue = event.target.value.replace(/,/g, ''); // Remove commas
    let numericValue = parseFloat(rawValue);

    if (!isNaN(rawValue)) {
      formControl.setValue(rawValue, { emitEvent: false }); // Store the numeric value
      event.target.value = this.formatToIndianCurrency(rawValue); // Show formatted value
   
    if (numericValue > 100000000) {
      this.creditLimitExceeds = true;
      console.log('Credit Limit cannot exceed 100,000,000');
      formControl?.setValue('100,000,000'); // Reset to max allowed value
    } else {
      this.creditLimitExceeds = false;
      // formControl?.setValue(numericValue);
      event.target.value = this.formatToIndianCurrency(rawValue);
    }
  }
  }
  formatCreditLimit(event: any, formControl: AbstractControl): void {
    const rawValue = event.target.value.replace(/,/g, ''); // Remove commas
    if (!isNaN(rawValue)) {
      formControl.setValue(rawValue, { emitEvent: false }); // Store the numeric value
      event.target.value = this.formatToIndianCurrency(rawValue); // Show formatted value
    }
  }

  private formatToIndianCurrency(value: string): string {
    let x = value.split('.')[0]; // Handle whole numbers only
    let lastThree = x.substring(x.length - 3);
    const otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '') lastThree = ',' + lastThree;
    const formattedValue =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return formattedValue;
  }


  get expectedTurnover() {
    return this.CreditLimitReqForm.get('expectedTurnover');
  }

  get expectedProfit() {
    return this.CreditLimitReqForm.get('expectedProfit');
  }

  get profitPercentage() {
    return this.CreditLimitReqForm.get('profitPercentage');
  }
  // Formats the number with Indian numbering system (with thousand separators)
  formatNumber(value: string | number): string {
    if (!value) return '';

    let x = value.toString().split('.')[0]; // Handle whole numbers only
    let lastThree = x.substring(x.length - 3); // Get the last three digits
    const otherNumbers = x.substring(0, x.length - 3); // Get the rest of the digits
    if (otherNumbers !== '') lastThree = ',' + lastThree;

    // Format the remaining numbers in pairs of two digits (Indian numbering system)
    const formattedValue =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

    return formattedValue;
  }

  // Updates the form control while keeping numeric value
  onTurnoverInput(event: Event) {
    const input = (event.target as HTMLInputElement).value.replace(/,/g, ''); // Remove commas
    const numericValue = parseFloat(input);
    if (!isNaN(numericValue)) {
      this.CreditLimitReqForm.get('expectedTurnover')?.setValue(numericValue);
      this.calculateProfitPercentage(); // Call the calculation on change
    }
  }

  onProfitInput(event: Event) {
    const input = (event.target as HTMLInputElement).value.replace(/,/g, ''); // Remove commas
    const numericValue = parseFloat(input);
    if (!isNaN(numericValue)) {
      this.CreditLimitReqForm.get('expectedProfit')?.setValue(numericValue);
      this.calculateProfitPercentage(); // Call the calculation on change
      const expectedProfit = this.CreditLimitReqForm.get('expectedProfit')?.value;
      this.getSegment(expectedProfit);
    }
  }

  // Method to calculate profit percentage
  calculateProfitPercentage() {
    const expectedTurnover = this.CreditLimitReqForm.get('expectedTurnover')?.value;
    const expectedProfit = this.CreditLimitReqForm.get('expectedProfit')?.value;
    if (expectedTurnover && expectedProfit) {
            const profitPercentage = (expectedProfit / expectedTurnover) * 100;
            this.CreditLimitReqForm.get('profitPercentage')?.setValue(parseFloat(profitPercentage.toFixed(2)));
          } else {
            this.CreditLimitReqForm.get('profitPercentage')?.setValue(0);
          }
  }

  toggleCustomerTypeCheckbox(event: any) {
    this.isExistingCustomer = event.target.checked;
    console.log("this.isExistingCustomer",this.isExistingCustomer)
    this.toggleCustomerType(); // Update validation when checkbox is toggled
    this.patchCustomerIdName();
  }
  patchCustomerIdName() {
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
      console.log("credit ", this.creditTerm);
    });
  }
  loadBranch() {
    this.CreditLimitSer.getBranch().subscribe((data: any[]) => {

      this.branch = data;
      console.log("branch", this.branch);
    });
  }

  // http://108.181.191.121:5000/api/Company/cust
  fetchCompanies(): void {
    this.creditLimitRequestModalService.getCompaniesliv().subscribe(
      (data: CompanyInfo[]) => {
        this.companies = data;
        console.log("comp", this.companies)
      },
      (error: any) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  onsalePersonChange(event: any) {

    const selectedValue = event ? event.userDisplayName : '';
    this.CreditLimitReqForm.get('salePersonName').setValue(selectedValue);

    setTimeout(() => {
      this.customerIdField.focus();
    }, 0);
  }

  onChangeBranch(event: any) {
    const selectedValue = event ? event.companyName : '';
    this.CreditLimitReqForm.get('branchName').setValue(selectedValue);

    setTimeout(() => {
      this.limitField.nativeElement.focus();
    }, 0);
  }

  onChangefrequency(event: any) {
    const selectedValue = event ? event.name : '';
    this.CreditLimitReqForm.get('frequency').setValue(selectedValue);
    if (selectedValue === 'Project') {
      this.CreditLimitReqForm.get('expiryDate')?.enable();  // Enable field
    } else {
      // this.fetchNextDecemberDate();
      this.CreditLimitReqForm.get('expiryDate').setValue(this.nextDecemberDate);
      this.CreditLimitReqForm.get('expiryDate')?.enable(); // Disable field (readonly)
    }
    setTimeout(() => {
      this.limitField.nativeElement.focus();
    }, 0);
  }


  onChangecreditTerm(event: any) {
    const selectedValue = event ? event.paymentTerm1 : '';
    this.CreditLimitReqForm.get('creditTermName').setValue(selectedValue);

    setTimeout(() => {
      this.noteField.nativeElement.focus();
    }, 0);
  }

  onCompanyNameChange(event: any) {
    const selectedValue = event ? event.companyName : '';
    this.CreditLimitReqForm.get('customerName').setValue(selectedValue);
    setTimeout(() => {
      this.branchIdField.focus();
    }, 0);
  }

  onSubmit() {
    if (this.CreditLimitReqForm.invalid) {
      this.markFormAsTouched();
      return;
    }
    this.isSubmitting = true; // Disable the button when submission starts

    const data =  { ...this.CreditLimitReqForm.value };
    if (data.expiryDate) {
      data.expiryDate = this.convertToDateTime(data.expiryDate);
    }
    console.log('Form Submitted:', data);
    console.log('Form Submitted:', this.livRequestData);
    if (this.livRequestData) {
      console.log("Status is Revised++++++++++++++++++++++++++");
      // Call update request when status is "Revised"
      this.CreditLimitSer.updateCreditLimitRequest(this.livRequestData, data).subscribe(
        (res: any) => {
          console.log(res);
          this.close();
          Swal.fire({
            title: 'Success!',
            text: 'Your LIV Request has been updated successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.close();
            // window.location.reload();
            this.router.navigate(['/credit-limit-req-list']); 
            // this.loadLIVRequests(this.userId);
            // this.activityNotificationService.notify('LIV Request updated successfully.');
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update LIV Request. Please try again.',
            icon: 'error'
          });
          this.activityNotificationService.notify('Failed to update LIV Request.');
        }
      );

    }else if(this.livRequestDataApprove){

      console.log("Status is Approved++++++++++++++++++++++++++");
      console.log("livrequestId",this.livRequestDataApprove)
      this.CreditLimitReqForm.get('livrequestId').setValue(0);
        this.CreditLimitReqForm.get('oldLivrequestId').setValue(this.livRequestDataApprove);
        console.log("create approve",this.CreditLimitReqForm.value);
        this.createNewLivRequest(this.CreditLimitReqForm.value);
    
    }
     else {
console.log("creating new liv request");
      
       // Check if customer name already exists
    this.CreditLimitSer.checkCustomerExists(data.customerName,data.branchName).subscribe((exists: boolean) => {
      console.log('Customer exists:', exists);
      if (exists) {
        Swal.fire({
          title: 'Error!',
          text: 'LIV Request already exists for this customer.',
          icon: 'error'
        });
        this.isSubmitting = false; // Re-enable button
      } else {
        // Proceed with creating the request
        // this.CreditLimitSer.createCreditLimitRequest(data).subscribe((res: any) => {
        //   if (res) {
        //     console.log(res);
        //     this.close();
        //     Swal.fire({
        //       title: 'Success!',
        //       text: 'Your LIV Request has been created successfully.',
        //       icon: 'success',
        //       timer: 2000,
        //       showConfirmButton: false
        //     }).then(() => {
        //       this.cd.detectChanges();
        //       this.loadLIVRequests(this.userId);
        //       this.activityNotificationService.notify('LIV Request Created Successfully.');
        //     });
        //   }
        // }, (error) => {
        //   Swal.fire({
        //     title: 'Error!',
        //     text: 'Failed to create LIV Request. Please try again.',
        //     icon: 'error'
        //   });
        //   this.activityNotificationService.notify('Failed to create LIV Request.');
        // });
        this.createNewLivRequest(data);
      }
    });
    }

    
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
        console.log()
        this.CreditLimitReqForm.get('livrequestId').setValue(0);
        this.CreditLimitReqForm.get('oldLivrequestId').setValue(livrequestId);
        console.log("create",this.CreditLimitReqForm.value);
        this.createNewLivRequest(this.CreditLimitReqForm.value);
      }
    });
  }
  createNewLivRequest(data:any){

    console.log("normal request approve");
    this.CreditLimitSer.createCreditLimitRequest(data).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.close();
        Swal.fire({
          title: 'Success!',
          text: 'Your LIV Request has been created successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          // this.cd.detectChanges();
          // this.loadLIVRequests(this.userId);
          // this.activityNotificationService.notify('LIV Request Created Successfully.');
          this.router.navigate(['/credit-limit-req-list']); 
        });
      }
    }, (error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create LIV Request. Please try again.',
        icon: 'error'
      });
      this.activityNotificationService.notify('Failed to create LIV Request.');
    });
  }
  convertToDateTime(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toISOString(); // Converts to "YYYY-MM-DDTHH:mm:ss.sssZ" format
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
  livRequests: any[] = [];
  totalRecords: number = 0;
  awaitingApprovedCount: number = 0;
  pageNumber: number = 1;
  pageSize: number = 10;
  loading: boolean = false;

  loadLIVRequests(userId: any) {
    this.loading = true;

    this.creditLimitReqListSer.getLIVRequests(userId, this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.livRequests = response.livrequest || [];
        this.totalRecords = response.totalRecords || 0;
        this.awaitingApprovedCount = response.awaitingApprovedCount || 0;

        console.log("Awaiting Approval Count:", this.awaitingApprovedCount);
        console.log("All LIV Data:", this.livRequests);

        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching LIV requests', error);
        this.loading = false;
      }
    });
  }
  fetchNextDecemberDate() {
    const inputDate = new Date().toISOString().split('T')[0]; // Example input date
    this.creditLimitRequestModalService.getNextDecemberDate(inputDate).subscribe(
      (response) => {
        this.nextDecemberDate = this.formatDate(response.nextDecemberDate); // Format properly
        console.log('Next December Date:', this.nextDecemberDate);
  
        if (this.CreditLimitReqForm.get('expiryDate')) {
          this.CreditLimitReqForm.get('expiryDate')?.enable();
          this.CreditLimitReqForm.patchValue({
            expiryDate: this.nextDecemberDate
          });
          this.CreditLimitReqForm.updateValueAndValidity();
        }
        
      },
      (error) => {
        console.error('Error fetching date:', error);
      }
    );
  }
  // Helper function to format date properly
formatDate(dateString: string): string {
  return dateString.split('T')[0]; // Extracts "yyyy-MM-dd" part
}

segmentData:any;
selectedSegment:any;
getSegment(profit: any): void {
  if (profit > 0) {
    this.creditLimitRequestModalService.getSegmentByProfit(profit).subscribe({
      next: (data) => {
        if (data) {
          // this.segmentData = `${data.startGrossProfitInr} - ${data.endGrossProfitInr}`;
          this.CreditLimitReqForm.patchValue({ segment: data.segment });
        }
      },
      error: () => {
        this.segmentData = '';
        this.CreditLimitReqForm.patchValue({ segment: '' });
      }
    });
  }
 
  
}

// get profitPercentageDisplay() {
//   const value = this.CreditLimitReqForm.controls['profitPercentage'].value;
//   return value !== null && value !== undefined ? `${value}%` : '';
// }

  
  
}

// this.CreditLimitSer.createCreditLimitRequest(this.CreditLimitReqForm.value).subscribe((res: any) => {

      //   if (res) {
      //     console.log(res);
      //     this.close();
      //     // window.location.reload();
      //     Swal.fire({
      //       title: 'Success!',
      //       text: 'Your credit limit request has been created successfully.',
      //       icon: 'success',
      //       timer: 2000,
      //       showConfirmButton: false
      //     }).then(() => {
      //       console.log("userId", this.userId)
      //       this.loadLIVRequests(this.userId);
      //       this.activityNotificationService.notify('Credit limit request created successfully.');

      //       // Navigate to the credit-limit-req-list after the alert
      //       // this.router.navigate(['/credit-limit-req-list']);
      //     });
      //   }

      // }, (error) => {
      //   Swal.fire({
      //     title: 'Error!',
      //     text: 'Failed to create credit limit request. Please try again.',
      //     icon: 'error'
      //   });
      //   this.activityNotificationService.notify('Failed to create credit limit request.');

      // });

      // formatCreditLimit2(event: any) {
      //   let value = event.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters except numbers
      //   value = Number(value).toLocaleString('en-US'); // Format number with commas
      //   this.CreditLimitReqForm.get('creditLimit')?.setValue(value, { emitEvent: false });
      // }