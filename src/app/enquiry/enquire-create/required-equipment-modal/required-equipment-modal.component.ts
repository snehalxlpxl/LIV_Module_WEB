import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RequiredEquipmentModalService } from './required-equipment-modal.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-required-equipment-modal',
  templateUrl: './required-equipment-modal.component.html',
  styleUrls: ['./required-equipment-modal.component.scss']
})
export class RequiredEquipmentModalComponent implements OnInit {
  requiredEquipmentForm: FormGroup;
  @Input() containerData:any;
  containerTypes = [
    { id: 1, name: '40GP' },
    { id: 2, name: '20GP' },
    // Add more container options as needed
  ];

  enquiryId: any;
  userId: any;

  constructor(public activeModal: NgbActiveModal,private fb:FormBuilder,private requiredEquipeSer:RequiredEquipmentModalService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
      // this.userName = userData.userName;
      this.userId = userData.userId;
      // console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
  } else {
      console.log('No user data found in sessionStorage');
  }
    this.route.params.subscribe(params => {
     if (params.type === 'edit') {
        this.enquiryId=params.id;
      }
    });
    this.initForm();
    if(this.containerData){
      this.enquiryId=this.containerData.enquiryId;
      console.log("this.enquiryId",this.enquiryId);
      console.log("data for patch container",this.containerData);
      this.patchForm(this.containerData) 
    }
  }
  initForm(){
    this.requiredEquipmentForm = this.fb.group({
      containerId:0,
      enquiryId:0,
      containerTypesId:0,
      containerType: '',
      containerCount:0,
      createdBy:this.userId,
      modifiedBy:this.userId,
      deletedBy:this.userId,
    });
  }
  patchForm(data:any){
    this.requiredEquipmentForm.patchValue({
      containerId:data.enquiryContainerId,
      enquiryId:data.enquiryId,
      containerTypesId:data.containerTypeId,
      containerType:data.containerType,
      containerCount:data.containerCount,
    });
  }

  closeModal(): void {
    this.activeModal.dismiss('Modal dismissed');
  }
  addRequiredEquipment(form: any) {
    const containerid = this.requiredEquipmentForm.get('containerId').value;
    if (this.requiredEquipmentForm.valid) {
      if (containerid) {
        //update

        console.log("updated Object", this.requiredEquipmentForm.value);
        this.updateContainer(containerid, this.requiredEquipmentForm.value)
      } else {
        //add to list
        console.log(this.requiredEquipmentForm.value);
        this.requiredEquipeSer.addEquipment(this.requiredEquipmentForm.value);
        console.log(this.requiredEquipeSer.getEquipementList());
        this.closeModal();
      }
    }
    else {
      this.requiredEquipmentForm.markAllAsTouched();
    }
  }
  updateContainer(id:number,data:any){
    this.requiredEquipeSer.updateContainer(id,data).subscribe( res => {
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
  onChangeContainer(event:any){
    const containerTypesname=event ? event.name : '';
    this.requiredEquipmentForm.get('containerType').setValue(containerTypesname);
    console.log(containerTypesname);

  }
}
