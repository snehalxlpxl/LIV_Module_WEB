import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PakageDetailModalService } from './pakage-detail-modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-package-detail-modal',
  templateUrl: './package-detail-modal.component.html',
  styleUrls: ['./package-detail-modal.component.scss']
})
export class PackageDetailModalComponent implements OnInit {
  newpakagesForm:FormGroup;
  @Input() pakageData: any;
  // @Output() packageDetailsAdded = new EventEmitter<void>();

  // Define properties for form data binding
  packageTypes = [
    { id: 1, name: 'Boxes' },
    { id: 2, name: 'Packets' },
    // Add more options as needed
  ];
  grossWeight: number = 540; // Default example value
  packageCount: number;
  length: number;
  width: number;
  height: number;
  netWeight: number;
  grossWeightDetails: number;
  volumeWeight: number;
  cbm: number;
  userId: any;

  constructor(public activeModal: NgbActiveModal,private fb: FormBuilder,private pakagesSer:PakageDetailModalService) { }

  ngOnInit(): void {
  this.getloggedInUser();
   this.initForm();
    if(this.pakageData){
      console.log("data for patch",this.pakageData);
      this.patchForm(this.pakageData);
    }
   }
   getloggedInUser(){
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
   initForm(){
    this.newpakagesForm = this.fb.group({
      enquiryPackageId:0,
      packageTypeId:[0],
      enquiryId:0,
      packageType: '',
      totalGrossWeight: [] ,// For hidden field
      packageCount: [],
      lengthMm: [],
      weightMm: [],
      heightMm: [],
      netWeight: [],
      grossWeight:[],
      volumeWeight:[],
      cbm: [],
      createdBy:this.userId,
      modifiedBy:this.userId,
      deletedBy:this.userId,
    });
   }
   patchForm(data:any) {
    this.newpakagesForm.patchValue({
      enquiryPackageId:data.enquiryPackageId,
      enquiryId:data.enquiryId,
      packageTypeId:data.packageTypeId,
      packageType:data.packageType,
      totalGrossWeight:data.totalGrossWeight,
      packageCount:data.packageCount,
      lengthMm:data.lengthMm,
      weightMm:data.weightMm,
      heightMm:data.heightMm,
      netWeight:data.netWeight,
      grossWeight:data.grossWeight,
      volumeWeight:data.volumeWeight,
      cbm:data.cbm
    });
  }
   close() {
    this.activeModal.dismiss();
  }

  addPackageDetails(form: any) {
    // Handle package details submission logic
    // this.packageDetailsAdded.emit();
    const packageTypeId = this.newpakagesForm.get('enquiryPackageId').value;
    if (this.newpakagesForm.valid) {
      if (packageTypeId) {
        //update
        console.log("updated obj", this.newpakagesForm.value);
        this.updateContainer(packageTypeId, this.newpakagesForm.value)
      } else {
        console.log(this.newpakagesForm.value);
        this.pakagesSer.addPakages(this.newpakagesForm.value);
        console.log(this.pakagesSer.getPakagesList());
        this.close();
      }

    }
    else {
      this.newpakagesForm.markAllAsTouched();
    }
  }
  closeModal(): void {
    this.activeModal.dismiss('Modal dismissed');
  }
  updateContainer(id:number,data:any){
    this.pakagesSer.updatePakages(id,data).subscribe( res => {
      console.table(data);
     
     
      // window.location.reload();
      // this.router.navigate([`/customer/edit/${data.companyId}`]).then(() => {
      //   this.toastr.success('Address updated successfully', "", {
      //     timeOut: 3000,
      //   });
      // });
      this.activeModal.dismiss();
      Swal.fire('Success', 'Container updated successfully', 'success');
      
    },
    (err) => {
      Swal.fire('Error', 'Error updating Container', 'error');
      console.error('Error updating Container:', err);
     
        this.activeModal.dismiss(); // Return undefined to parent component
      
    }
  );
  }
  calculateTotalGrossWeight(form: any) {
    if ( form.value.lengthMm && form.value.weightMm && form.value.heightMm) {
      const totalGrossWeight = (form.value.lengthMm * form.value.weightMm*form.value.heightMm)/6000;
      this.newpakagesForm.get('totalGrossWeight').setValue(totalGrossWeight);
      const grossWeight = (form.value.lengthMm * form.value.weightMm*form.value.heightMm)/6000;
      this.newpakagesForm.get('grossWeight').setValue(grossWeight);
      const volumeWeight = (form.value.lengthMm * form.value.weightMm*form.value.heightMm)/6000;
      this.newpakagesForm.get('volumeWeight').setValue(volumeWeight);
    } else {
      this.newpakagesForm.get('totalGrossWeight').setValue(null);
      this.newpakagesForm.get('grossWeight').setValue(null);
      this.newpakagesForm.get('volumeWeight').setValue(null);
    }
  }
  onChangePakageType(event: any) {
    const selectedValue = event ? event.name : '';
    this.newpakagesForm.get('packageType').setValue(selectedValue);
    // setTimeout(() => {
    //   this.companyField.nativeElement.focus();
    // }, 0);
  }
}
