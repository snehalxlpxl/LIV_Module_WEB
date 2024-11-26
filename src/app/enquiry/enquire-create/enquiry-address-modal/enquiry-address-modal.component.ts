import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AddCustAddressService } from 'app/main/apps/companies/customers/customer-create/add-cust-addr-modal/add-cust-address.service';
import { EnquiryAddressModalService } from './enquiry-address-modal.service';

@Component({
  selector: 'app-enquiry-address-modal',
  templateUrl: './enquiry-address-modal.component.html',
  styleUrls: ['./enquiry-address-modal.component.scss']
})
export class EnquiryAddressModalComponent implements OnInit {
  @Input() addressData: any; // Data passed from the parent component
  @Output() updatedAddress = new EventEmitter<any>();
  @Input() enquiryIdFromUrl:any;
  @Input() viewType:any;

  
    @ViewChild('company') companyField!:  ElementRef;
      @ViewChild('state') stateField!: NgSelectComponent;
    @ViewChild('zipCode') zipcodeField!:  ElementRef;
    @Input() isPreview:any;
    @Input() customerIdfromPreview:any;

  addressForm: FormGroup;
  addressTypes = [
    { value: 1, label: 'PICKUP' },
    { value: 2, label: 'DILIVERY' },
   
    // Add other address types here
  ];
  countries : any[];
  states = [];
  customerId: number;
  userId: any;
 


  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public addAddrSer:AddCustAddressService,
    private enqAddrSer:EnquiryAddressModalService,
    private toastr: ToastrService,
    private router:Router,
    private activeroute: ActivatedRoute,
    private enquiryAddrSer:EnquiryAddressModalService
  ) {}

  ngOnInit(): void {
    this.userLogInData();
    this.addressForm = this.fb.group({
      enquiryAddressId:0,
      enquiryId:0,
      addressTypeId: 0,
      addressTypeValue: [''] ,// For hidden field
      company: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      CountryName:[''],
      state: ['', Validators.required],
      StateName:[''],
      zipCode: ['', [Validators.required]], // Example for US ZIP code
      createdBy:this.userId??0,
      modifiedBy:this.userId??0,
      deletedBy:this.userId??0,
    });
    this.getCountry();
     // Watch for changes on the country form control
     this.addressForm.get('country').valueChanges.subscribe(countryId => {
      this.onCountrySelect(countryId);
    });

    if (this.addressData) {
      // this.patchForm();
      console.log("data for patch",this.addressData);
      this.patchForm(this.addressData) 
    }
    this.activeroute.paramMap.subscribe(params => {
      this.customerId = +params.get('id');
    });
  }

  userLogInData(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
      // this.userName = userData.userName;
      this.userId = userData.userId;
      // console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
      } else {
          console.log('No user data found in sessionStorage');
      }
  }
  
  patchForm(data:any) {
    this.addressForm.patchValue({
      enquiryAddressId:data.enquiryAddressId,
      enquiryId:data.enquiryId,
      addressTypeId:data.addressTypeId,
      addressTypeValue:data.addressTypeNick,
      company:data.companyName,
      addressLine1:data.addressLine1,
      addressLine2:data.addressLine2,
      city:data.city,
      country:data.countryId,
      CountryName:data.countryName,
      state:data.stateId,
      StateName:data.stateName,
      zipCode:data.zipcode,

    });
  }
  close() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    const addressId = this.addressForm.get('enquiryAddressId').value;

    if (this.addressForm.valid) {

      console.log(this.addressForm.value)
      if (addressId) {
        this.updateEnquiryAddress(addressId,this.addressForm.value);
      } else {
        if(this.viewType=='edit'){

          this.addressForm.patchValue({
            enquiryId: this.enquiryIdFromUrl
          });
          console.log("insert",this.addressForm.value);
          this.insertEnquiryAddre(this.addressForm.value);

        }else{
        this.enquiryAddrSer.addEnquiryAddressDetails(this.addressForm.value);
        console.log(this.enquiryAddrSer.getEnquiryAddDetailsList());
        this.close();
        }
      }

    }
    else {
      this.addressForm.markAllAsTouched();
    }
  }

  getCountry()
  {
    this.addAddrSer.getCountry().subscribe((data: any[]) => {
      this.countries = data;
      console.log(" country", this.countries);
    });
  }
  getCountryState()
  {
    this.addAddrSer.getCountryState().subscribe((data: any[]) => {
      this.countries = data;
      console.log("states", this.countries);
    });
  }
  onCountrySelect(countryId: number): void {
    if (countryId) {
      // Fetch country and state data and filter states based on selected country
      console.log(countryId);
      this.addAddrSer.getCountryState().pipe(
        map(data => {
          // Ensure that 'data' is a list of states
          return data.filter(state => state.countryId === countryId);
        })
      ).subscribe(filteredStates => {
        this.states = filteredStates;
        console.log(this.states);
        // this.addressForm.get('state').setValue(null); // Clear state selection
      }, error => {
        // Handle any errors if necessary
        console.error('Error fetching states:', error);
      });
    } else {
      // No country selected, clear states
      this.states = [];
      this.addressForm.get('state').setValue(null); // Clear state selection
    }
  }
  
  onAddressTypeChange(event: any) {
    const selectedValue = event ? event.label : '';
    this.addressForm.get('addressTypeValue').setValue(selectedValue);
    setTimeout(() => {
      this.companyField.nativeElement.focus();
    }, 0);
  }
  onChangeCountry(event:any){
    const selectedValue = event ? event.countryName : '';
    this.addressForm.get('CountryName').setValue(selectedValue);
    setTimeout(() => {
      this.stateField.focus();
    }, 0);
  }
  onChangeState(event:any){
    const selectedValue = event ? event.stateName : '';
    this.addressForm.get('StateName').setValue(selectedValue);
    setTimeout(() => {
      this.zipcodeField.nativeElement.focus();
    }, 0);
  }
  updateEnquiryAddress(id: number, data: any) {
    this.enqAddrSer.updateEnquiryAddress(id, data).subscribe(res => {

      this.activeModal.dismiss();
      Swal.fire('Success', 'Enquiry Address updated successfully', 'success');

    },
      (err) => {
        Swal.fire('Error', 'Error updating Enquiry Address', 'error');
        console.error('Error updating Enquiry Address:', err);

        this.activeModal.dismiss(); // Return undefined to parent component

      }
    );
  }
  insertEnquiryAddre(data:any){
    this.enquiryAddrSer.insertEnquiryAddre(data).subscribe( res => {
 
      this.activeModal.dismiss();

      Swal.fire('Success', 'Address added successfully', 'success');
      window.location.reload();
    },
    (err) => {
      Swal.fire('Error', 'Error Adding Address', 'error');
      console.error('Error Adding Address:', err);
     
        this.activeModal.dismiss(); // Return undefined to parent component
      
    }
  );
  }

}
