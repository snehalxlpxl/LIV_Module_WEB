import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCustAddressService } from './add-cust-address.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-cust-addr-modal',
  templateUrl: './add-cust-addr-modal.component.html',
  styleUrls: ['./add-cust-addr-modal.component.scss']
})
export class AddCustAddrModalComponent implements OnInit {

  @Input() addressData: any; // Data passed from the parent component
  @Output() updatedAddress = new EventEmitter<any>();

  
    @ViewChild('company') companyField!:  ElementRef;
      @ViewChild('state') stateField!: NgSelectComponent;
    @ViewChild('zipCode') zipcodeField!:  ElementRef;


  addressForm: FormGroup;
  addressTypes = [
    { value: 1, label: 'PRIMARY' },
    { value: 2, label: 'SHIPPING' },
    { value: 3, label: 'BILLING' },
    { value: 4, label: 'BILLING-GST' },
    { value: 5, label: 'SHIPPER' },
    { value: 6, label: 'CONSIGNEE' },
    { value: 7, label: 'NOTIFY PARTY' },
    // Add other address types here
  ];
  countries : any[];
  states = [];
 


  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public addAddrSer:AddCustAddressService,
    private toastr: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      companyAddressId:0,
      companyId:0,
      addressType: [0],
      addressTypeValue: [null] ,// For hidden field
      company: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      CountryName:[''],
      state: ['', Validators.required],
      StateName:[''],
      zipCode: ['', [Validators.required]], // Example for US ZIP code
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
  }
  patchForm(data:any) {
    this.addressForm.patchValue({
      companyAddressId:data.companyAddressId,
      companyId:data.companyId,
      addressType:data.addressTypeId,
      addressTypeValue:data.addressTypeNick,
      company:data.companyName,
      addressLine1:data.addressLine1,
      addressLine2:data.addressLine2,
      city:data.cityName,
      country:data.countryId,
      CountryName:data.country,
      state:data.stateId,
      StateName:data.stateName,
      zipCode:data.zipcode,

    });
  }
  close() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.addressForm.valid) {
      if (this.addressForm.get('companyAddressId')?.value == 0) {
      this.addAddrSer.addAddressDetails(this.addressForm.value);
      console.log(this.addAddrSer.getAddDetailsList());
      this.close();
    }
    else{
      //update
      console.log("update");
      console.log(this.addressForm.value)
      const id=this.addressForm.get('companyAddressId')?.value
      this.updateCustAddre(id,this.addressForm.value);
     
      
    }
      
    }
    else{
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
  updateCustAddre(id:number,data:any){
    this.addAddrSer.updateCustAddre(id,data).subscribe( res => {
      console.table(data.companyId);
     
     
      // window.location.reload();
      // this.router.navigate([`/customer/edit/${data.companyId}`]).then(() => {
      //   this.toastr.success('Address updated successfully', "", {
      //     timeOut: 3000,
      //   });
      // });
      this.activeModal.dismiss();
      Swal.fire('Success', 'Address updated successfully', 'success');
      
    },
    (err) => {
      Swal.fire('Error', 'Error updating Address', 'error');
      console.error('Error updating Address:', err);
     
        this.activeModal.dismiss(); // Return undefined to parent component
      
    }
  );
  }
}
