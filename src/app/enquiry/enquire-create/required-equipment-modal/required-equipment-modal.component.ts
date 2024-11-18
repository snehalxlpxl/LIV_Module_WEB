import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RequiredEquipmentModalService } from './required-equipment-modal.service';

@Component({
  selector: 'app-required-equipment-modal',
  templateUrl: './required-equipment-modal.component.html',
  styleUrls: ['./required-equipment-modal.component.scss']
})
export class RequiredEquipmentModalComponent implements OnInit {
  requiredEquipmentForm: FormGroup;
  containerTypes = [
    { id: 1, name: '40GP' },
    { id: 2, name: '20GP' },
    // Add more container options as needed
  ];
containerCount: number = 1;

  constructor(public activeModal: NgbActiveModal,private fb:FormBuilder,private requiredEquipeSer:RequiredEquipmentModalService) { }

  ngOnInit(): void {
    this.requiredEquipmentForm = this.fb.group({
      containerTypesId:[0],
      containerTypes: '',
      containerCount:[]
    });
  }

  closeModal(): void {
    this.activeModal.dismiss('Modal dismissed');
  }
  addRequiredEquipment(form:any) {
    if(this.requiredEquipmentForm.valid){
      console.log(this.requiredEquipmentForm.value);
      this.requiredEquipeSer.addEquipment(this.requiredEquipmentForm.value);
                console.log(this.requiredEquipeSer.getEquipementList());
                this.closeModal();
      }
      else{
        this.requiredEquipmentForm.markAllAsTouched();
      }
  }
  onChangeContainer(event:any){
    const containerTypesname=event ? event.name : '';
    this.requiredEquipmentForm.get('containerTypes').setValue(containerTypesname);
    console.log(containerTypesname);

  }
}
