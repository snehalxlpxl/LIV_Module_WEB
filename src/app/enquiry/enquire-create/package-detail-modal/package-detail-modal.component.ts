import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PakageDetailModalService } from './pakage-detail-modal.service';

@Component({
  selector: 'app-package-detail-modal',
  templateUrl: './package-detail-modal.component.html',
  styleUrls: ['./package-detail-modal.component.scss']
})
export class PackageDetailModalComponent implements OnInit {
  newpakagesForm:FormGroup;
  @Output() packageDetailsAdded = new EventEmitter<void>();

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

  constructor(public activeModal: NgbActiveModal,private fb: FormBuilder,private pakagesSer:PakageDetailModalService) { }

  ngOnInit(): void {
    this.newpakagesForm = this.fb.group({
      packageTypeId:[0],
      packageType: '',
      totalGrossWeight: [] ,// For hidden field
      packageCount: [],
      lengthMm: [''],
      weightMm: [''],
      heightMm: [''],
      netWeight: [''],
      grossWeight:[''],
      volumeWeight:[],
      cbm: [''],
    });
    // this.enquiryAddressForm.valueChanges.subscribe((form) => {
    //   this.calculateTotalGrossWeight(form);
    //   // alert("hi")
    // });
   }
   close() {
    this.activeModal.dismiss();
  }

  addPackageDetails(form:any) {
    // Handle package details submission logic
    // this.packageDetailsAdded.emit();
    if(this.newpakagesForm.valid){
    console.log(this.newpakagesForm.value);
    this.pakagesSer.addPakages(this.newpakagesForm.value);
              console.log(this.pakagesSer.getPakagesList());
              this.close();
    }
    else{
      this.newpakagesForm.markAllAsTouched();
    }
  }
  closeModal(): void {
    this.activeModal.dismiss('Modal dismissed');
  }
  calculateTotalGrossWeight(form: any) {
    if (form.value.packageCount && form.value.lengthMm && form.value.weightMm && form.value.heightMm && form.value.netWeight && form.value.grossWeight) {
      const totalGrossWeight = form.value.packageCount * form.value.grossWeight;
      this.newpakagesForm.get('totalGrossWeight').setValue(totalGrossWeight);
    } else {
      this.newpakagesForm.get('totalGrossWeight').setValue(null);
    }
  }
}
