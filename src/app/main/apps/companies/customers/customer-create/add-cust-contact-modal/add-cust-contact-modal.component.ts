import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddContactDetailService } from './add-contact-detail.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-cust-contact-modal',
  templateUrl: './add-cust-contact-modal.component.html',
  styleUrls: ['./add-cust-contact-modal.component.scss']
})
export class AddCustContactModalComponent implements OnInit {

  @Input() contactData: any; // Data passed from the parent component
  @Input() companyId: any; // Data passed from the parent component
  contactForm: FormGroup;

  @ViewChild('name', { static: false }) nameField!: ElementRef;
  @Input() customerIdfromPreview:any;
  @Input() isPreview:any;
  getContactType: any[];

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public addContactSer:AddContactDetailService,
    public contactTpyeSer:AddContactDetailService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      contactId:0,
      companyId:0||this.companyId,
      contactType: ['', Validators.required],
      addressTypeValue:[''],
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      landline: ['', Validators.required],
      designation: [''],
      department: ['', Validators.required],
      dateOfBirth: [null||''],
    });
    this.getGstContactType();

    if (this.contactData) {
      // this.patchForm();
      console.log("contact data for patch",this.contactData);
      this.patchForm(this.contactData) 
    }
    console.log("isPreview",this.isPreview);
  }

  patchForm(data:any) {
    this.contactForm.patchValue({
      contactType:data.contactTypeId,
      contactTypename:data.contactTypeName,
      companyId:data.companyId,
      contactId:data.contactId,
      name:data.displayName,
      email:data.email,
      mobile:data.mobile,
      landline:data.phone,
      designation:data.designation,
      department:data.department,
      dateOfBirth:data.dob ? data.dob.split('T')[0] : null 
    });
  }

  close() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      if(this.isPreview){
        this.insertCustAddre(this.contactForm.value);
        
      }
      else{
      console.log("contactId",this.contactForm.get("contactId")?.value)
      console.log("company Id",this.companyId)
      if (this.contactForm.get('contactId')?.value == 0) {
        console.log(this.contactForm.value);
        this.addContactSer.addContactDetails(this.contactForm.value);
        console.log(this.addContactSer.getContactDetailsList());
        this.close();
      
      }
      else{
        //update
        console.log("update");
        console.log(this.contactForm.value)
        const id=this.contactForm.get('contactId')?.value
        console.log("id:",id);
        this.updateCustContact(id,this.contactForm.value);
        
      }
    }
    }else{
      this.contactForm.markAllAsTouched();
      return;
    }
  }

  getGstContactType()
  {
    this.contactTpyeSer.getGstContactType().subscribe((data: any[]) => {
      this.getContactType = data;
      console.log("gst Register type", this.getContactType);
    });
  }

  onContactTypeChange(event: any) {
    const selectedValue = event ? event.contactTypeName : '';
    this.contactForm.get('addressTypeValue').setValue(selectedValue);

    setTimeout(() => {
      console.log('Name Field:', this.nameField); // Log to ensure it is correctly selected
      this.nameField?.nativeElement.focus();
    }, 100);
  }

  updateCustContact(id:number,data:any){
    this.addContactSer.updateCustContact(id,data).subscribe( data => {
      this.activeModal.dismiss();
      Swal.fire('Success', 'Address updated successfully', 'success');
      // this.toastr.success('Address updated successfully');
      
    },
    err => {
      this.toastr.error('Error updating Address');
      console.error('Error updating Address:', err);
    }
  );
  }
  insertCustAddre(data:any){
    this.addContactSer.insertCustContact(data).subscribe( res => {
 
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
