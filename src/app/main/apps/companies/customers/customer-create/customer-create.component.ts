import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { CustomerCreateService, UniqueCheckResponse } from "./customer-create.service";
import { CompanyInfo } from "./customer-create-model/CustomerInfo";
import {Observable, of, Subject, Subscription} from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddCustAddrModalComponent } from "./add-cust-addr-modal/add-cust-addr-modal.component";
import { AddCustContactModalComponent } from "./add-cust-contact-modal/add-cust-contact-modal.component";
import { AddCustGstDetailsComponent } from "./add-cust-gst-details/add-cust-gst-details.component";
import { TaxDetailsService } from "./add-cust-gst-details/tax-details.service";
import { AddCustAddressService } from "./add-cust-addr-modal/add-cust-address.service";
import { AddContactDetailService } from "./add-cust-contact-modal/add-contact-detail.service";
import { catchError, debounceTime, filter, finalize, map, switchMap } from "rxjs/operators";
import { Location } from '@angular/common';
import Swal from "sweetalert2";
import { LoaderService } from "app/global-loader/loader.service";
import { NgSelectComponent } from "@ng-select/ng-select";



@Component({
  selector: "app-customer-create",
  templateUrl: "./customer-create.component.html",
  styleUrls: ["./customer-create.component.scss"],
})
export class CustomerCreateComponent implements OnInit{
  newCustomerCreate: FormGroup;
  addressForm: FormGroup;
  salesPerson: any[];
  currency: any[];
  companies: CompanyInfo[] = [];
  search$ = new Subject<string>();
  loading = false;
  creditDay: any[];
  customerId: number;
  custEditCreatestring:any;
  isSideNavOpen = false;
  taxDetailsList: any[] = [];
  addrDetailsList:any[] = [];
  contactDetailsList: any[]=[];
  // private routerSubscription: Subscription;
  isNameAvailable = true; // Track if the name is available
  isAccordionExpanded = true;
  activePanelId1 = 'panelBorderBottom1';
  activePanelId2 = 'panelBorderBottom2';
  activePanelId3 = 'panelBorderBottom3';

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
    console.log("open side nav");
  }

  //to focus on next field
  @ViewChild('custName') custNameField!:  ElementRef;
  @ViewChild('email') emailField!:  ElementRef;
  @ViewChild('creditLimit') creditLimitField!:  ElementRef;
  @ViewChild('panNumber') panNumberField!:  ElementRef;
  
  constructor(
    private apiService: CustomerCreateService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private modalService: NgbModal,
    private taxDetailsService: TaxDetailsService,
    private addrDetailsService: AddCustAddressService,
    private contactDetailsService: AddContactDetailService,
    private location:Location,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.activePanelId1 = '';
    this.activePanelId2 = '';
    this.activePanelId3 = '';
    this.newCustomerCreate = this.fb.group({
      customerId: [0]||this.customerId ,
      salesPerson: [0, Validators.required],
      salesPersonName:[''],
      custName: ['', Validators.required,this.uniqueCustomerNameValidator(this.apiService,this.loaderService)],
      // custName: ['', [Validators.required]],
      parentCompany: [0],
      parentCompanyName:[''],
      email: ['', [Validators.required, Validators.email]],
      website: [''],
      currency: [0, Validators.required],
      currencyName:[''],
      creditLimit: [null,Validators.required],
      creditDays: [0,Validators.required],
      creditDaysName:[''],
      panNumber: [''],
      tanNumber: [''],
      contact:[''],
      address:[''],
      gst: [''],
     
    });

    // console.log('this.custNameControl');
    // console.log(this.custNameControl);
    // console.log(this.newCustomerCreate.get('custName').setValidators(Validators.and([Validators.required, this.customValidator()])))
    //console.log(this.newCustomerCreate.get('custName').setValidators(Validators.compose([Validators.required, this.customValidator()])))
    this.clearArray(); 

    // this.routerSubscription = this.router.events
    // .pipe(
    //   filter(event => event instanceof NavigationEnd)
    // )
    // .subscribe((event: NavigationEnd) => {
    //   console.log('Route changed to:', event.url);
    //   this.clearArray();
    // });
  
   

    //get edit customer id by url
    this.activeroute.paramMap.subscribe(params => {
      this.customerId = +params.get('id');
      
      if(this.customerId){
        console.log("customer id for update",this.customerId);
        this.loadCustomerData(this.customerId);
        this.getaddrDetail(this.customerId);
        this.getTaxDetail(this.customerId);
        this.getContactDetail(this.customerId);
        this.custEditCreatestring="Edit Customer";
        this.contactDetailsList=[];
        this.activePanelId1 = 'panelBorderBottom1';
        this.activePanelId2 = 'panelBorderBottom2';
        this.activePanelId3 = 'panelBorderBottom3';
      }
      else
      {
        this.clearArray();
        console.log("customer id for create",this.customerId);
        this.custEditCreatestring="New Customer";
        this.getAllTaxDetailfromModal();
        this.getAllAddrDetailfromModal();
        this.getAllContactDetailfromModal();
        this.activePanelId1 = 'panelBorderBottom1';
        this.activePanelId2 = 'panelBorderBottom2';
        this.activePanelId3 = 'panelBorderBottom3';
      }
    });
    this.loadSalesPerson();
    this.getCurrency();
    this.getCreditDays();
    this.fetchCompanies();
    // this.getAllTaxDetailfromModal();
    // this.getAllAddrDetailfromModal();
    // this.getAllContactDetailfromModal();
    
  }
  
  clearArray() {
    this.taxDetailsList = [];
    this.addrDetailsList=[];
    this.contactDetailsList=[];
  }
//end of ngOnInit
  saveCustomer(newCustomerCreate: FormGroup): void {
    console.log("Customer Id",this.customerId);
    if (newCustomerCreate.valid) {
      if (this.contactDetailsList.length === 0) {
        this.toastr.warning('Please add at least one contact detail before submitting the form.');
        return; // Prevent form submission
      }
      else if(this.addrDetailsList.length===0){
        this.toastr.warning('Please add at least one Address detail before submitting the form.');
        return; // Prevent form submission
      }
      else if(this.taxDetailsList.length===0){
        this.toastr.warning('Please add at least one Tax detail before submitting the form.');
        return; // Prevent form submission
      }
      //check for id
      if(this.customerId==0){
      this.custEditCreatestring="New Customer";
      const formData = newCustomerCreate.value;
      console.log(newCustomerCreate.value);
      console.log("object", newCustomerCreate.value);
      this.createNewCustomer( newCustomerCreate.value);
    }
    else{
      this.loadSalesPerson();
      this.getCurrency();
      this.getCreditDays();
      this.fetchCompanies();
      // this.taxDetailsList=[];
      console.log("update Customer",this.customerId);
      this.newCustomerCreate.get('customerId').setValue(this.customerId);
      const formData = newCustomerCreate.value;
      const customerData = {
        customerId: this.newCustomerCreate.get('customerId').value,
        salesPerson: this.newCustomerCreate.get('salesPerson').value,
        salesPersonName: this.newCustomerCreate.get('salesPersonName').value,
        custName: this.newCustomerCreate.get('custName').value,
        parentCompany: this.newCustomerCreate.get('parentCompany').value,
        email: this.newCustomerCreate.get('email').value,
        website: this.newCustomerCreate.get('website').value,
        currency: this.newCustomerCreate.get('currency').value,
        creditLimit: this.newCustomerCreate.get('creditLimit').value,
        creditDays: this.newCustomerCreate.get('creditDays').value,
        panNumber: this.newCustomerCreate.get('panNumber').value,
        tanNumber: this.newCustomerCreate.get('tanNumber').value,
        // contact: this.newCustomerCreate.get('contact').value,
        // address: this.newCustomerCreate.get('address').value,
        // gst: this.newCustomerCreate.get('gst').value,
      };
      console.log("object for update", newCustomerCreate.value);
      console.log("object for update", customerData);
      // this.updateCustomerById(this.customerId,formData);
      this.updateCustomerById(this.customerId,customerData);
      
     
    }
    } else {
      
      // If Invalid show errors
      // this.taxDetailsList=[];
      let key = Object.keys(newCustomerCreate.controls);
      console.log(newCustomerCreate.controls);

      console.log(key);
      key.filter((data) => {
        console.log("data", data);
        let control = newCustomerCreate.controls[data];
        if (control.errors != null) {
          control.markAsTouched();
        }
      });
      return;
      // alert("form invalid !!");
    }
  }
  

  loadSalesPerson() {
    this.apiService.getSalesPerson().subscribe((data: any[]) => {
    
      this.salesPerson = data;
      console.log("sales Person", this.salesPerson);
    });
  }

  // createNewCustomer(company: any) {
  //   console.log("hk",company);
  //   this.apiService.createNewCustomer(company).subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       this.toastr.success("Data Added successfully", "Data Added successfully", {
  //         timeOut: 5000,
  //       });
  //       // this.router.navigate(['/customerList']).then(() => {
  //       this.router.navigate(['/customerList']).then(() => {
  //         this.toastr.success("Redirected to Customer List", "", {
  //           timeOut: 3000,
  //         });
  //       });
  //     },
  //     (err: any) => {
  //       this.toastr.error("Please Fill all Valid details", "", {
  //         timeOut: 3000,
  //       });
  //       console.error("Error creating new customer:", err);
  //     }
  //   );
  // }
  createNewCustomer(company: any) {
    console.log("hk", company);
    this.apiService.createNewCustomer(company).subscribe(
      (data: any) => {
        console.log("Created customer data:", data);
        if (data) {
          console.log("Navigating to preview page with company ID:", data);
          this.router.navigate(['/customer/preview/', data]).then(() => {
            // this.toastr.success("Redirected to Preview", "", {
            //   timeOut: 3000,
            // });
            Swal.fire({
              title: "Success!",
              text: "Redirected to Preview",
              icon: "success",
              timer: 3000, // The alert will automatically close after 3 seconds
              showConfirmButton: false // Hides the 'OK' button
            });
          });
        } else {
          console.error("Company ID not found in response data:");
        }
        // this.toastr.success("Data Added successfully", "Added !!", {
        //   timeOut: 5000,
        // });
        Swal.fire({
          title: "Added!",
          text: "Data Added successfully",
          icon: "success",
          timer: 3000, // The alert will automatically close after 3 seconds
          showConfirmButton: false // Hides the 'OK' button
        });
      },
      (err: any) => {
        if (err.error && err.error.message) {
          // Specific error message from the server
          Swal.fire({
            title: "Error!",
            text: err.error.message,
            icon: "error",
            timer: 3000,
            showConfirmButton: false
          });
        } else {
          // General error message
          Swal.fire({
            title: "Error!",
            text: "Please fill all valid details",
            icon: "error",
            timer: 3000,
            showConfirmButton: false
          });
        }
        console.error("Error creating new customer:", err);
      }
    );
  }
  updateCustomerById(id:any,customerData:any){
    this.apiService.updateCustomerById(id, customerData).subscribe(
      data => {
        // this.toastr.success('Customer updated successfully');
        Swal.fire({
          title: "Success!",
          text: "Customer updated successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 2000 // The alert will automatically close after 2 seconds
        });
        
      },
      err => {
        // this.toastr.error('Error updating customer');
        Swal.fire({
          title: "Error!",
          text: "Error updating customer",
          icon: "error",
          showConfirmButton: false,
          timer: 2000 // The alert will automatically close after 2 seconds
        });
        
        console.error('Error updating customer:', err);
      }
    );
  }
  getCurrency() {
    this.apiService.getCurrency().subscribe((data: any[]) => {
      this.currency = data;
      console.log("currency",this.currency);
    });
  }
  getCreditDays() {
    this.apiService.getCreditDays().subscribe((data: any[]) => {
      this.creditDay = data;
      console.log("credit",this.creditDay);
    });
  }

  filteredCompanies = [];
  selectedCompany = null;
  showDropdown = false;
  filterCompanies(searchText: string) {
    this.filteredCompanies = this.companies.filter((company) =>
      company.companyName.toLowerCase().includes(searchText.toLowerCase())
    );
    this.showDropdown = true;
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


  clearForm(){
    this.newCustomerCreate.reset();
  }
  
  loadCustomerData(customerId: number) {
    console.log("load",customerId);

    this.apiService.getCustomerById(customerId).subscribe((customer: any) => {
   
      const cost=customer; //object
      console.log("data by id", cost);
      console.log("data by id", cost.companyId);

        this.newCustomerCreate.patchValue({
          customerId: cost.companyId,
          salesPerson: cost.ownerId,
          salesPersonName:cost.salesPersonName,
          custName: cost.companyName,
          parentCompany: cost.parentCompanyId,
          email: cost.email,
          website: cost.website,
          currency: cost.currencyId,
          creditLimit: cost.creditLimit,
          creditDays: cost.creditDaysId,
          panNumber: cost.pannumber,
          tanNumber: cost.tanNumber,
      
      });
    });
  }

  openAddressForm() {
    const modalRef = this.modalService.open(AddCustAddrModalComponent);
    this.activePanelId1 = 'panelBorderBottom1';
    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }
  openAddressFormlByData(data:any)
  {
    const modalRef = this.modalService.open(AddCustAddrModalComponent, { size: 'lg' });
    this.isAccordionExpanded = true;
    this.activePanelId1 = 'panelBorderBottom1';
    // Pass data to the modal component
    modalRef.componentInstance.addressData = data;

    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed');
      window.location.reload();
    });

  }

  openContactForm(id:any) {
    const modalRef = this.modalService.open(AddCustContactModalComponent);
    modalRef.componentInstance.companyId = id;
    this.activePanelId2 = 'panelBorderBottom2';
    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }
  openContatFormlByData(data:any)
  {
    const modalRef = this.modalService.open(AddCustContactModalComponent, { size: 'lg' });
    this.activePanelId2 = 'panelBorderBottom2';
    // Pass data to the modal component
    modalRef.componentInstance.contactData = data;

    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed');
      window.location.reload();
    });

  }

  openTaxDetailsModal(id:any): void {
    const modalRef = this.modalService.open(AddCustGstDetailsComponent, { size: 'lg' });
    modalRef.componentInstance.companyId = id;
    this.activePanelId3 = 'panelBorderBottom3';
    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed');
    });
  }

  openTaxFormlByData(data:any)
  {
    const modalRef = this.modalService.open(AddCustGstDetailsComponent, { size: 'lg' });
    this.activePanelId3 = 'panelBorderBottom3';
    // Pass data to the modal component
    modalRef.componentInstance.GSTData = data;

    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed');
      window.location.reload();

    });

  }
 
  getAllTaxDetailfromModal(){
    
    this.taxDetailsService.currentTaxDetailsList.subscribe(list => {
      this.taxDetailsList=[];
      this.taxDetailsList = list;
      console.log("cust create gst",this.taxDetailsList);
      this.newCustomerCreate.get('gst').setValue(this.taxDetailsList);

      if (list.length > 0) {
        // this.toastr.success('New GST Details added successfully!', 'GST Detail Added');
        Swal.fire({
          title: 'Success!',
          text: 'New GST Details added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        
      }
      // this.taxDetailsList=[];
    });
  }
  
  getAllAddrDetailfromModal() {
    this.addrDetailsList=[];
    this.addrDetailsService.CurrentAddressList.subscribe(list => {
      this.addrDetailsList = list;
      console.log("cust create addr", this.addrDetailsList);
      this.newCustomerCreate.get('address').setValue(this.addrDetailsList);
      this.isAccordionExpanded=true;
      if (list.length > 0) {
        this.isAccordionExpanded=true;
        Swal.fire({
          title: 'Success!',
          text: 'New Address added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
      // this.addrDetailsList=[];
    });
  }
  
  getAllContactDetailfromModal(){
    this.contactDetailsList=[];
    this.contactDetailsService.CurrentcontactList.subscribe(list => {
      this.contactDetailsList = list;
      console.log("cust create contact",this.contactDetailsList);
      this.newCustomerCreate.get('contact').setValue(this.contactDetailsList);
      if (list.length > 0) {
        // this.toastr.success('New contact added successfully!', 'Contact Added');
        Swal.fire({
          title: 'Success!',
          text: 'New Contact added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
      // this.contactDetailsList=[];
    });
  }
  getaddrDetail(id:number){
    // this.addrDetailsList=[];
    this.apiService.getCustAddressById(id).subscribe((data: any[]) => {
    // let taxdetail:any;
    //   taxdetail = data;
      // this.addrDetailsList.push(data);
      this.addrDetailsList=data;
      console.log("addr length", this.addrDetailsList.length);
      console.log("addr by id",this.addrDetailsList);
    });
  }
  getContactDetail(id:number){
    this.contactDetailsList=[];
    this.apiService.getCustContactById(id).subscribe((data: any[]) => {
      // this.contactDetailsList.push(data);
      this.contactDetailsList=data;
      console.log("Contact length", this.contactDetailsList.length);
      console.log("Contact detail by id",this.contactDetailsList);
    });
  }
  getTaxDetail(id:number){
    this.apiService.getCustTaxDetailById(id).subscribe((data: any[]) => {
      // this.taxDetailsList.push(data);
      this.taxDetailsList=data;
      console.log("gst length", this.taxDetailsList.length);
      console.log("gst detail by id",this.taxDetailsList);
    });
  }
  
 
copyAddress(event: MouseEvent, detail: any) {
  event.stopPropagation(); // Prevents the row click event from being triggered
  const address = `${detail.company|| detail.companyName}, ${detail.addressLine1}, ${detail.addressLine2}, ${detail.city||detail.cityName}-${detail.zipCode|| detail.zipcode}, ${detail.country}, ${detail.state ||detail.stateName}`;
  navigator.clipboard.writeText(address).then(() => {
    this.toastr.success('Copied to clipboard!', 'Copied', {
      timeOut: 2000 // Hide the message after 2 seconds
    });
  }).catch((error) => {
    console.error('Error copying address to clipboard:', error);
    this.toastr.error('Error copying address to clipboard', 'Error');
  });
}
onChangeSalePerson(event:any){
  const selectedValue = event ? event.userDisplayName : '';
  this.newCustomerCreate.get('salesPersonName').setValue(selectedValue);
  setTimeout(() => {
    this.custNameField.nativeElement.focus();
  }, 0);
}
onChangeParentCompany(event:any){
  const selectedValue = event ? event.companyName : '';
  this.newCustomerCreate.get('parentCompanyName').setValue(selectedValue);
  setTimeout(() => {
    this.emailField.nativeElement.focus();
  }, 0);
}
onChangeCurrency(event:any){
  // const selectedValue = event ? event.userDisplayName : '';
  // this.newCustomerCreate.get('salesPersonName').setValue(selectedValue);
  setTimeout(() => {
    this.creditLimitField.nativeElement.focus();
  }, 0);
}
onChangeCreditDays(event:any){
  // const selectedValue = event ? event.userDisplayName : '';
  // this.newCustomerCreate.get('salesPersonName').setValue(selectedValue);
  setTimeout(() => {
    this.panNumberField.nativeElement.focus();
  }, 0);
}
cancelPreview(){
  this.location.back();
}

// uniqueCustomerNameValidator(customerService: CustomerCreateService): AsyncValidatorFn {
//   return (control: AbstractControl): Observable<ValidationErrors | null> => {
//     console.log('uniqueCustomerNameValidator call'); 
//     console.log('Control Value:', control.value); 

//     if (!control.value) {
//       console.log('Condition True'); 
//       return of(null); // No validation if the control is empty
//     }

//     return customerService.checkUniqueCustomerName(control.value).pipe(
//       map((response: UniqueCheckResponse) => {
//         console.log('API response:', response.isExsist); 
//         return response.isExsist ? { nonUnique: true } : null; // Return null if the name is unique
//       }),
//       catchError((error) => {
//         console.error('Error occurred during validation:', error); // Log the error
//         return of(null); // Return null to indicate no validation errors if there's an error
//       })
//     );
//   };
// }
uniqueCustomerNameValidator(customerService: CustomerCreateService, loaderService: LoaderService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    console.log('uniqueCustomerNameValidator call');
    console.log('Control Value:', control.value);

    if (!control.value) {
      console.log('Condition True');
      return of(null); // No validation if the control is empty
    }

    // // Start the loader
    // loaderService.requestStarted();

    return customerService.checkUniqueCustomerName(control.value).pipe(
      map((response: UniqueCheckResponse) => {
        console.log('API response:', response.isExsist);
        return response.isExsist ? { nonUnique: true } : null &&  loaderService.requestEnded(); // Return null if the name is unique
      }),
      catchError((error) => {
        console.error('Error occurred during validation:', error); // Log the error
        return of(null); // Return null to indicate no validation errors if there's an error
      }),
      finalize(() => {
        // Stop the loader
        loaderService.requestEnded();
      })
    );
  };
}


get custNameControl() {
  return this.newCustomerCreate.get('custName');
}
}
