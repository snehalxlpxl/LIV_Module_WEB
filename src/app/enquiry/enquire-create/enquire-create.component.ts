import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AppInitService } from 'app/app-init.service';
import { LeadCreateService, ServiceType } from 'app/Leads/lead-create/lead-create.service';
import { EnquireCreateService } from './enquire-create.service';

@Component({
  selector: 'app-enquire-create',
  templateUrl: './enquire-create.component.html',
  styleUrls: ['./enquire-create.component.scss']
})
export class EnquireCreateComponent implements OnInit {

  newEnqiryCreate: FormGroup;
  salesPerson: any;
  locationMasterData: any;
  serviceTypes: ServiceType[];
  incoTerm: any;

  customerStatusOptions = [
    { id: 1, label: 'Customer' },
    { id: 2, label: 'Lead' }
  ];
  userId: any;


  constructor( private location:Location,private fb: FormBuilder,private appInitService: AppInitService, private leadCreateService: LeadCreateService, private enquireCreateServ:EnquireCreateService) { }

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

    this.newEnqiryCreate = this.fb.group({
      CustomerStatus: [''],
      CompanyOrLeadId:0,
      CompanyName:[''],
      LeadOwnerId:0,
      ServiceTypeId:0,
      ServiceType: [''],
      IncoTermsId: [0],
      IncoTerms:[''],
      TypeOfMoveId:0,
      POLId:0,
      POL:[''],
      PODId:0,
      POD:[''],
      Commodity: [''],
      FreeTimeOrigin: [''],
      FreeTimeDestination: [''],
      Notes:[''],
      UN_Id:0,
      UN_Name:[''],
      RemarksHazardousCargo: [''],
      EnquiryStatus:[''],
      IsHazardous: false,
      CreatedBy:this.userId,
      ModifiedBy:0,
      DeletedBy:0,
      Isdeleted:0
     
    });

    this.salesPerson = this.appInitService.salesPerson;
    this.locationMasterData = this.appInitService.locationMasterData; //appinitilizer
    this.getServiceTypes();
    this.getIncoTerm();
  }
  

  saveEnquiry(newEnqiryCreate: FormGroup){
    console.log(newEnqiryCreate.value);
  }
  cancelPreview(){
    this.location.back();
  }

  getServiceTypes() {
    this.enquireCreateServ.getServiceType().subscribe(
      (data: any) => {
        this.serviceTypes = data
        console.log("serviceTypes", this.serviceTypes)
      },
      (error) => console.error('Failed to fetch service types', error)
    );
  }
  getIncoTerm(){
    this.enquireCreateServ.getIncoTerm().subscribe(
      (data: any) => {
        this.incoTerm = data
        console.log("IncoTerm", this.incoTerm)
      },
      (error) => console.error('Failed to fetch IncoTerm', error)
    );
  }
  onChangeIncoTerm(event:any){
    const selectedValue = event ? event.incotermName : '';
    this.newEnqiryCreate.get('IncoTerms').setValue(selectedValue);
    // setTimeout(() => {
    //   this.custNameField.nativeElement.focus();
    // }, 0);
  }
  onChangeServiceType(event:any){
    const selectedValue = event ? event.jobtypeName : '';
    this.newEnqiryCreate.get('ServiceType').setValue(selectedValue);
  }
  onChangePOL(event:any){
    const selectedValue = event ? event.locationShortName : '';
    this.newEnqiryCreate.get('POL').setValue(selectedValue);
  }
  onChangePOD(event:any){
    const selectedValue = event ? event.locationShortName : '';
    this.newEnqiryCreate.get('POD').setValue(selectedValue);
  }
  onChangeCustomerStatus(event:any){
      const selectedValue = event ? event.locationShortName : '';
      this.newEnqiryCreate.get('POD').setValue(selectedValue);
    }
  onHazardousChange(event: any) {
      this.newEnqiryCreate.patchValue({
        IsHazardous: event.target.checked ? 1 : 0
      });
  }
}
