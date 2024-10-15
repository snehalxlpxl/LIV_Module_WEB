import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { TaxDetailsService } from "./tax-details.service";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-cust-gst-details",
  templateUrl: "./add-cust-gst-details.component.html",
  styleUrls: ["./add-cust-gst-details.component.scss"],
})
export class AddCustGstDetailsComponent implements OnInit {
  @Input() GSTData: any; // Data passed from the parent component
  @Input() companyId: any; // Data passed from the parent component
  taxDetailsForm: FormGroup;
  getGstRegType: any[];
  sourcOfSupply = [
    { value: 1, label: "Manager" },
    { value: 2, label: "Developer" },
    // Add other designations here
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private taxDetailsService: TaxDetailsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log("GST data companyId", this.companyId);
    this.taxDetailsForm = this.fb.group({
      gstid: [0],
      companyId: 0 || this.companyId,
      gst: ["", Validators.required],
      GSTTypeValue: [""],
      gstin: [""],
      sop: [0],
      SopTypeValue: [""],
      bln: [""],
      businessTrad: [""],
    });

    // Watch for changes on GST Registration Type
    this.taxDetailsForm.get("gst").valueChanges.subscribe((value) => {
      this.setConditionalValidators(value);
    });
    this.getGstRegistrationType();

    if (this.GSTData) {
      // this.patchForm();
      console.log("GST data for patch", this.GSTData);

      this.patchForm(this.GSTData);
    }
  }
  patchForm(data: any) {
    this.taxDetailsForm.patchValue({
      companyId: data.customerId,
      gstid: data.taxDetailId,
      gst: data.gstRegistrationTypeId,
      gstin: data.gstNum,
      sop: data.sourceOfSupplyId,
      bln: data.businessLegalName,
      businessTrad: data.businessTradeName,
    });
  }
  setConditionalValidators(gstTypeId: number) {
    const gstinControl = this.taxDetailsForm.get("gstin");
    const sopControl = this.taxDetailsForm.get("sop");
    const blnControl = this.taxDetailsForm.get("bln");
    const businessTradControl = this.taxDetailsForm.get("businessTrad");

    // Reset validators
    gstinControl.clearValidators();
    sopControl.clearValidators();
    blnControl.clearValidators();
    businessTradControl.clearValidators();

    if (gstTypeId === 1) {
      // Registered
      gstinControl.setValidators([Validators.required]);
      sopControl.setValidators([Validators.required]);
      blnControl.setValidators([Validators.required]);
      businessTradControl.setValidators([Validators.required]);
    }

    // Update the validity state after setting validators
    gstinControl.updateValueAndValidity();
    sopControl.updateValueAndValidity();
    blnControl.updateValueAndValidity();
    businessTradControl.updateValueAndValidity();
  }

  closeModal(): void {
    this.activeModal.close();
  }

  onSubmit(): void {
    if (this.taxDetailsForm.valid) {
      console.log("taxId",this.taxDetailsForm.get("gstid")?.value)
      console.log("company Id",this.companyId)
      if (this.taxDetailsForm.get("gstid")?.value == 0 ) {
        this.taxDetailsService.addTaxDetails(this.taxDetailsForm.value);
        console.log(this.taxDetailsService.getTaxDetailsList());
        // this.activeModal.close(this.taxDetailsForm.value);
        this.closeModal();
      }  else {
        //update
        console.log("update");
        console.log(this.taxDetailsForm.value);
        const id = this.taxDetailsForm.get("gstid")?.value;
        console.log("id:", id);
        this.updateGSTDetail(id, this.taxDetailsForm.value);
        // this.closeModal();
      }
    } else {
      this.taxDetailsForm.markAllAsTouched();
    }
  }

  getGstRegistrationType() {
    this.taxDetailsService.getGstRegistrationType().subscribe((data: any[]) => {
      this.getGstRegType = data;
      console.log("gst Register type", this.getGstRegType);
    });
  }

  onGstRegistrTypeChange(event: any) {
    const selectedValue = event ? event.gstregType : "";
    this.taxDetailsForm.get("GSTTypeValue").setValue(selectedValue);
  }
  onSourceOfSuppTypeChange(event: any) {
    const selectedValue = event ? event.label : "";
    this.taxDetailsForm.get("SopTypeValue").setValue(selectedValue);
  }
  updateGSTDetail(id: number, data: any) {
    this.taxDetailsService.updateCustGst(id, data).subscribe(
      (data) => {
        this.activeModal.dismiss();
        Swal.fire('Success', 'GST Details updated successfully', 'success');
      },
      (err) => {
        this.toastr.error("Error updating Address");
        console.error("Error updating Address:", err);
      }
    );
  }
}
