import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AppInitService } from 'app/app-init.service';
import { LeadCreateService, ServiceType } from 'app/Leads/lead-create/lead-create.service';
import { EnquireCreateService } from './enquire-create.service';
import { RequiredEquipmentModalComponent } from './required-equipment-modal/required-equipment-modal.component';
import { PackageDetailModalComponent } from './package-detail-modal/package-detail-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnquiryAddressModalComponent } from './enquiry-address-modal/enquiry-address-modal.component';
import Swal from 'sweetalert2';
import { ToastrService } from "ngx-toastr";
import { EnquiryAddressModalService } from './enquiry-address-modal/enquiry-address-modal.service';
import { PakageDetailModalService } from './package-detail-modal/pakage-detail-modal.service';
import { RequiredEquipmentModalService } from './required-equipment-modal/required-equipment-modal.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerCreateService } from 'app/main/apps/companies/customers/customer-create/customer-create.service';
import { LeadsListComponent } from 'app/Leads/leads-list/leads-list.component';
import { LeadsListService } from 'app/Leads/leads-list/leads-list.service';
import { Subject } from 'rxjs';
// import { differentPOLPODValidator, samePOLPODValidator } from './differentPOLPODValidator';
import { stat } from 'fs';
import { samePOLPODValidator } from './differentPOLPODValidator';

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
    { label: 'Lead', value: 'Lead' },
    { label: 'Customer', value: 'Customer' }
  ];
  unNumbers = [
    { value: 1201, label: 'Fusel oil' },
    { value: 1202, label: '	Gas oil or diesel fuel or heating oil, light' },
    { value: 1203, label: 'Gasoline or petrol or motor spirit' },
    { value: 1204, label: 'Nitroglycerin' },
    { value: 1206, label: 'Heptanes' },
    { value: 1207, label: 'Hexaldehyde' },
    { value: 1208, label: 'Hexanes' }
    // Add more options as needed
  ];
  userId: any;
  enquiryaddrDetailsList: any[]= [];
  pakagesDetailsList: any[]= [];
  equipDetailsList: any[]= [];
  CustomerStatus: any;
  CustomerOrLeadId: any;
  companies: any;
  leaddata: any[] = [];
  disable: boolean;
  salesPersonOrLeadId: any;
  enquiryId: any;
  viewMode: any;


  constructor(private location: Location, private fb: FormBuilder, private appInitService: AppInitService,
    private enquireCreateServ: EnquireCreateService, private router: Router,
    private modalService: NgbModal, private enquiryAddrSer: EnquiryAddressModalService, private toastr: ToastrService,
    private pakgesSer: PakageDetailModalService, private equipSer: RequiredEquipmentModalService, private route: ActivatedRoute,
    private newCustcreate: CustomerCreateService, private _leadsListService: LeadsListService) {
      this.initForm(this.CustomerStatus,this.CustomerOrLeadId,this.salesPersonOrLeadId,this.userId);
      // console.log("value",this.newEnqiryCreate.value);
      // console.log("error",this.newEnqiryCreate.errors);
  }

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
    if (params.type === 'lead') {
     
      this.CustomerStatus="Lead";
      this.CustomerOrLeadId=params.id
      this.salesPersonOrLeadId=params.SalesOrLeadOwerId;
      this.getEnquiryLeadNameId(this.CustomerOrLeadId);
      this.disable=true;
      this.clearArray();
    } else if (params.type === 'customer') {
      this.CustomerStatus="Customer";
      this.CustomerOrLeadId=params.id;
      this.salesPersonOrLeadId=params.SalesOrLeadOwerId;
      this.getEnquiryCompanyNameId( this.CustomerOrLeadId);
      this.clearArray();
      this.disable = true;
    }else if (params.type === 'edit') {
      this.enquiryId=params.id;
      this.viewMode=params.type
      this.disable=false;
      this.clearArray();
    }
    else{
      this.CustomerStatus="Customer";
      this.disable=false;
      this.clearArray();
      this.enquiryId=0;
    }
    this.initForm(this.CustomerStatus,this.CustomerOrLeadId,this.salesPersonOrLeadId,this.userId);
  });
 

    
    this.salesPerson = this.appInitService.salesPerson;
    this.locationMasterData = this.appInitService.locationMasterData; //appinitilizer
    this.getServiceTypes();
    this.getIncoTerm();
    this.getAllAddrDetailfromModal();
    this.getAllPakagesfromModal();
    this.getAllEquipmentfromModal();
    this.fetchCompanies();
    this.getLeadData();
   
  if(this.enquiryId){
    this.loadEnquiryData(this.enquiryId);
    this.getEnquiryContainertById(this.enquiryId);
    this.getEnquiryPakagesById(this.enquiryId);
    this.getEnquiryAddressById(this.enquiryId);
  }else{
   
    this.clearArray();
    // this.clearForm();

    this.enquiryId=0;
  }

  }//end of ngOnit
  
  // initForm(CustomerStatus:any,CustomerOrLeadId:any,salesPersonOrLeadId:any,userID:number){
  //   this.newEnqiryCreate = this.fb.group({
  //     EnquiryId:0|| (this.enquiryId ?? 0),
  //     CustomerStatus: [CustomerStatus],
  //     CompanyOrLeadId:isNaN(parseInt(CustomerOrLeadId)) ? 0 : parseInt(CustomerOrLeadId),
  //     CompanyId:[isNaN(parseInt(CustomerOrLeadId)) ? 0 : parseInt(CustomerOrLeadId)],
  //     LeadId:isNaN(parseInt(CustomerOrLeadId)) ? 0 : parseInt(CustomerOrLeadId),
  //     LeadName:[''],
  //     CompanyName:[''],
  //     LeadOwnerId:isNaN(parseInt(salesPersonOrLeadId)) ? 0 : parseInt(salesPersonOrLeadId),
  //     ServiceTypeId:0,
  //     ServiceType: [''],
  //     IncoTermsId: [0],
  //     IncoTerms:[''],
  //     POLId:0,
  //     POL:[''],
  //     PODId:0,
  //     POD:[''],
  //     Commodity: [''],
  //     FreeTimeOrigin: [''],
  //     FreeTimeDestination: [''],
  //     note:[''],
  //     UN_Id:0,
  //     UN_Name:[''],
  //     RemarksHazardousCargo: [''],
  //     EnquiryStatus:['Awaiting Approval'],
  //     IsHazardous: false,
  //     CreatedBy:userID??0,
  //     ModifiedBy:userID??0,
  //     DeletedBy:userID??0,
  //     Isdeleted:false,
  //     equipment:[''],
  //     pakage:[''],
  //     address:[''],
     
  //   });
    
  // }
  

  initForm(CustomerStatus:any,CustomerOrLeadId:any,salesPersonOrLeadId:any,userID:number){
    this.newEnqiryCreate = this.fb.group({
      EnquiryId:0|| (this.enquiryId ?? 0),
      CustomerStatus: [CustomerStatus,[Validators.required]],
      CompanyOrLeadId:isNaN(parseInt(CustomerOrLeadId)) ? 0 : parseInt(CustomerOrLeadId),
      CompanyId:[isNaN(parseInt(CustomerOrLeadId)) ? 0 : parseInt(CustomerOrLeadId)],
      LeadId:isNaN(parseInt(CustomerOrLeadId)) ? 0 : parseInt(CustomerOrLeadId),
      LeadName:[''],
      CompanyName:[''],
      LeadOwnerId:isNaN(parseInt(salesPersonOrLeadId)) ? 0 : parseInt(salesPersonOrLeadId),
      ServiceTypeId:['', [Validators.required]],
      ServiceType: [''],
      IncoTermsId: ['', [Validators.required]],
      IncoTerms:[''],
      POLId:['', [Validators.required]],
      POL:[''],
      PODId:['', [Validators.required]],
      POD:[''],
      Commodity: [''],
      FreeTimeOrigin: ['',Validators.required],
      FreeTimeDestination: ['',Validators.required],
      note:[''],
      UN_Id:0,
      UN_Name:[''],
      RemarksHazardousCargo: [''],
      EnquiryStatus:['Awaiting Approval'],
      IsHazardous: false,
      CreatedBy:userID??0,
      ModifiedBy:userID??0,
      DeletedBy:userID??0,
      Isdeleted:false,
      equipment:[''],
      pakage:[''],
      address:[''],
     
    },
    { validators: samePOLPODValidator() }
  );
    
  }
  onChangePOLPOD() {
    this.newEnqiryCreate.updateValueAndValidity(); 
    console.log("value",this.newEnqiryCreate.value);
    console.log("error",this.newEnqiryCreate.errors);
  }
  clearForm(){
    // this.newEnqiryCreate.reset();
    this.newEnqiryCreate = this.fb.group({
      EnquiryId:0,
      CustomerStatus:null,
      CompanyOrLeadId:0,
      CompanyId:0,
      LeadId:0,
      LeadName:[''],
      CompanyName:[''],
      LeadOwnerId:null,
      ServiceTypeId:[null],
      ServiceType: [null],
      IncoTermsId: [null],
      IncoTerms:[''],
      POLId:[null],
      POL:[''],
      PODId:[null],
      POD:[''],
      Commodity: [''],
      FreeTimeOrigin: [''],
      FreeTimeDestination: [''],
      note:[''],
      UN_Id:null,
      UN_Name:[''],
      RemarksHazardousCargo: [''],
      EnquiryStatus:[''],
      IsHazardous: false,
      CreatedBy:0,
      ModifiedBy:0,
      DeletedBy:0,
      Isdeleted:false,
      equipment:[],
      pakage:[],
      address:[],
     
    }
  );
  }
  compareFn(a, b) {
    return a.companyId === b;
  }
//   saveEnquiry(newEnqiryCreate: FormGroup){
//     console.log("newEnqiryCreate", newEnqiryCreate);
//     console.log("newEnqiryCreate.get('ServiceType')", newEnqiryCreate.get('ServiceTypeId'));
//     console.log("newEnqiryCreate.get('ServiceType').value", newEnqiryCreate.get('ServiceTypeId').value);
// }
  saveEnquiry(newEnqiryCreate: FormGroup){
    console.log(newEnqiryCreate.get('ServiceTypeId').value);
    if(newEnqiryCreate.valid){
      if (newEnqiryCreate.get('ServiceTypeId').value == 1007 || newEnqiryCreate.get('ServiceTypeId').value == 1008) {
        if (this.pakagesDetailsList.length === 0) {
            this.toastr.warning('Please add at least one Pakages detail before submitting the form.');
            return; // Prevent form submission
        }
    } else {
        if (this.equipDetailsList.length === 0) {
            this.toastr.warning('Please add at least one Container detail before submitting the form.');
            return; // Prevent form submission
        }
    }
    
    if (this.enquiryaddrDetailsList.length === 0) {
        this.toastr.warning('Please add at least one Address detail before submitting the form.');
        return; // Prevent form submission
    }

   
    console.log("create",newEnqiryCreate.value);
    if(this.enquiryId){
  
      this.updateEnquiry(this.enquiryId,newEnqiryCreate.value);
      console.log("upadte obj:",newEnqiryCreate.value)
      // alert("update");
    }else{
      this.createNewEnquiry(newEnqiryCreate.value);
    }
  }else{
      let key = Object.keys(newEnqiryCreate.controls);
      console.log(newEnqiryCreate.controls);

      console.log(key);
      key.filter((data) => {
        console.log("data", data);
        let control = newEnqiryCreate.controls[data];
        if (control.errors != null) {
          control.markAsTouched();
        }
      });
      return;
  }
    

  }
  createNewEnquiry(enquiry: any) {
    console.log("Enquiry", enquiry);
    this.enquireCreateServ.createNewEnquiry(enquiry).subscribe(
      (data: any) => {
        console.log("Created Enquiry:", data);
        if (data) {
          this.clearForm();
          this.clearArray();
          console.log("Navigating to preview page with company ID:", data);
          this.router.navigate(['/enquiry-preview/', data.enquiryId]).then(() => {
          
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
  updateEnquiry(enqid:number,enquiryData:any){
    this.enquireCreateServ.updateEnquiryById(enqid, enquiryData).subscribe(
      data => {
        this.router.navigate(['/enquiry-preview/', enqid]).then(() => {
          
          Swal.fire({
            title: "Updated Successfully!",
            text: "Redirected to Preview",
            icon: "success",
            timer: 3000, // The alert will automatically close after 3 seconds
            showConfirmButton: false // Hides the 'OK' button
          });
        });
        
      },
      err => {
        // this.toastr.error('Error updating customer');
        Swal.fire({
          title: "Error!",
          text: "Error updating Enquiry",
          icon: "error",
          showConfirmButton: false,
          timer: 2000 // The alert will automatically close after 2 seconds
        });
        
        console.error('Error updating Enquiry:', err);
      }
    );
  }

  loadEnquiryData(enquiryId: number) {
    console.log("load enquiry data for patch",enquiryId);

    this.enquireCreateServ.getEnquiryById(enquiryId).subscribe((enquirydata: any) => {
   
      const data=enquirydata; //object
      console.log("data by id", data);
      console.log("data by id", data.enquiryId);

        this.newEnqiryCreate.patchValue({
          CustomerStatus: data.customerStatus,
          LeadOwnerId:data.leadOwnerId,
          CompanyOrLeadId:data.companyOrLeadId,
          CompanyName:data.companyName,
          CompanyId:data.companyOrLeadId,
          LeadId:data.companyOrLeadId,
          LeadName:data.companyName,
          ServiceTypeId:data.serviceTypeId,
          ServiceType:data.serviceType,
          IncoTermsId:data.incoTermsId,
          IncoTerms:data.incoTerms,
          POLId:data.polid,
          POL:data.pol,
          PODId:data.podid,
          POD:data.pod,
          Commodity: data.commodity,
          FreeTimeOrigin:data.freeTimeOrigin,
          FreeTimeDestination: data.freeTimeDestination,
          note:data.notes,
          UN_Id:data.unId,
          UN_Name:data.unName,
          RemarksHazardousCargo:data.remarksHazardousCargo,
          EnquiryStatus:data.enquiryStatus,
          IsHazardous: data.isHazardous,
      });
    });
  }
  getEnquiryContainertById(enquiryID:number){
    this.enquireCreateServ.getEnquiryContainertById(enquiryID).subscribe(
      (data: any[]) => {
        this.equipDetailsList = data
        console.log("check array: equipDetailsList",Array.isArray(this.equipDetailsList));
        console.log("equipment patch by Id", this.equipDetailsList)
      },
      (error) => console.error('Failed to fetch equipment', error)
    );
  }
  getEnquiryPakagesById(enquiryID:number){
    this.enquireCreateServ.getEnquiryPakagesById(enquiryID).subscribe(
      (data: any[]) => {
        this.pakagesDetailsList = data
        console.log("pakages patch by Id", this.pakagesDetailsList)
      },
      (error) => console.error('Failed to fetch equipment', error)
    );
  }
  getEnquiryAddressById(enquiryID:number){
    this.enquireCreateServ.getEnquiryAddressById(enquiryID).subscribe(
      (data: any[]) => {
        this.enquiryaddrDetailsList = data
        console.log("Address patch by Id", this.enquiryaddrDetailsList)
      },
      (error) => console.error('Failed to fetch Address', error)
    );
  }
  cancelPreview(){
    this.location.back();
  }
  clearArray() {
    this.equipDetailsList=[];
    this.pakagesDetailsList=[];
    this.enquiryaddrDetailsList=[];
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
  fetchCompanies(): void {
    this.newCustcreate.getCompanies().subscribe(
      (data:any) => {
        this.companies = data;
      },
      (error: any) => {
        console.error('Error fetching companies:', error);
      }
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
  selectedServiceType: string;
  onChangeServiceType(event:any){
    this.selectedServiceType = event ? event.jobtypeName : '';
    this.newEnqiryCreate.get('ServiceType').setValue(this.selectedServiceType);
  }
  onChangePOL(event:any){
    const selectedValue = event ? event.locationShortName : '';
    this.newEnqiryCreate.get('POL').setValue(selectedValue);
  }
  onChangePOD(event:any){
    const selectedValue = event ? event.locationShortName : '';
    this.newEnqiryCreate.get('POD').setValue(selectedValue);
  }
  // onChangeCustomerStatus(event:any){
  //     const selectedValue = event ? event.locationShortName : '';
  //     this.newEnqiryCreate.get('POD').setValue(selectedValue);
  //   }
  onHazardousChange(event: any) {
      // this.newEnqiryCreate.patchValue({
      //   IsHazardous: event.target.checked ? 1 : 0
      // });
  }

  openPackageDetailModal(enquiryId:number) {
    console.log("openPackageDetailModal")
    const modalRef = this.modalService.open(PackageDetailModalComponent, {
      size: 'lg',
      backdrop: 'static', 
    });
    modalRef.componentInstance.enquiryIdFromUrl = enquiryId;
    modalRef.componentInstance.viewType = this.viewMode;
  }

  openRequiredEquipmentModal(enquiryId:number){
    console.log("openRequiredEquipmentModal")
    
    const modalRef = this.modalService.open(RequiredEquipmentModalComponent, {
      size: 'md', 
      backdrop: 'static', 
    });
    
    modalRef.componentInstance.enquiryIdFromUrl = enquiryId;
    modalRef.componentInstance.viewType = this.viewMode;
  }
  openEnquiryAddressesModal(enquiryId:number){
    console.log("EnquiryAddressModalComponent")
    const modalRef = this.modalService.open(EnquiryAddressModalComponent, {
      size: 'md', 
      backdrop: 'static', 
    });
    modalRef.componentInstance.enquiryIdFromUrl = enquiryId;
    modalRef.componentInstance.viewType = this.viewMode;
  }
  getAllAddrDetailfromModal() {
    this.enquiryaddrDetailsList=[];
    this.enquiryAddrSer.CurrentEnquiryAddressList.subscribe(list => {
      this.enquiryaddrDetailsList = list;
      console.log("create addr", this.enquiryaddrDetailsList);
      this.newEnqiryCreate.get('address').setValue(this.enquiryaddrDetailsList);
      // this.isAccordionExpanded=true;
      if (list.length > 0) {
        // this.isAccordionExpanded=true;
        Swal.fire({
          title: 'Success!',
          text: 'New Address added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  getAllPakagesfromModal() {
    this.pakagesDetailsList=[];
    this.pakgesSer.CurrentPakagesList.subscribe(list => {
      this.pakagesDetailsList = list;
      console.log(" create pakage", this.pakagesDetailsList);
      this.newEnqiryCreate.get('pakage').setValue(this.pakagesDetailsList);
      // this.isAccordionExpanded=true;
      if (list.length > 0) {
        // this.isAccordionExpanded=true;
        Swal.fire({
          title: 'Success!',
          text: 'New Pakage added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  getAllEquipmentfromModal() {
    this.equipDetailsList=[];
    this.equipSer.CurrentEquipmentList.subscribe(list => {
      this.equipDetailsList = list;
      console.log(" create equipment", this.equipDetailsList);
      this.newEnqiryCreate.get('equipment').setValue(this.equipDetailsList);
      // this.isAccordionExpanded=true;
      if (list.length > 0) {
        // this.isAccordionExpanded=true;
        Swal.fire({
          title: 'Success!',
          text: 'New Equipment added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  openModalPakagesByData(data:any){
    const modalRef = this.modalService.open(PackageDetailModalComponent, { size: 'lg' });
    // this.isAccordionExpanded = true;
    // this.activePanelId1 = 'panelBorderBottom1';
    // Pass data to the modal component
    modalRef.componentInstance.pakageData = data;

    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed');
      window.location.reload();
    });

  }
  openModalContainerByData(data:any){
    const modalRef = this.modalService.open(RequiredEquipmentModalComponent, { size: 'lg' });
    // this.isAccordionExpanded = true;
    // this.activePanelId1 = 'panelBorderBottom1';
    // Pass data to the modal component
    modalRef.componentInstance.containerData = data;

    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed');
      window.location.reload();
    });
  }
  openModalEnqArressByData(data:any){
    const modalRef = this.modalService.open(EnquiryAddressModalComponent, { size: 'lg' });
    // this.isAccordionExpanded = true;
    // this.activePanelId1 = 'panelBorderBottom1';
    // Pass data to the modal component
    modalRef.componentInstance.addressData = data;

    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed');
      window.location.reload();
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
  onChangeCompany(event:any){
    const selectedValue = event ? event.companyName : '';
    this.newEnqiryCreate.get('CompanyName').setValue(selectedValue);
    // setTimeout(() => {
    //   this.emailField.nativeElement.focus();
    // }, 0);
    }
    onChangeLeadName(event:any){
      const selectedValue = event ? event.companyName : '';
      this.newEnqiryCreate.get('LeadName').setValue(selectedValue);
      // setTimeout(() => {
      //   this.emailField.nativeElement.focus();
      // }, 0);
    }
    getLeadData(){
      this._leadsListService.getDataTableRows().then((rows:any) => {
        this.leaddata = rows;
        console.log("Leads",this.leaddata);
      }).catch(error => {
        console.error('Error fetching leads data:', error);
      });
    }
    onChangeStatus(event:any){
      const checkStatus=event ? event.value : '';
      this.CustomerStatus=checkStatus
      // alert("onChangeStatus"+checkStatus)
      this.setValidator(checkStatus);
      this.newEnqiryCreate.updateValueAndValidity();
    }
    setValidator(status:any){
      // alert(status);
      const CompanyId = this.newEnqiryCreate.get('CompanyId');
      const LeadId = this.newEnqiryCreate.get('LeadId');
      if(CompanyId||LeadId){
        CompanyId.clearValidators();
        LeadId.clearValidators();
        if (status === 'Customer') {
          // Add validators for 'Customer' status
          CompanyId.setValidators([Validators.required]);
        } else if (status === 'Lead') {
          // Add different validators for 'Lead' status
          LeadId.setValidators([Validators.required]);
        } else {
          // Reset validators if the status is not 'Lead' or 'Customer'
          this.newEnqiryCreate.get('CompanyId')?.setValidators(null);
          this.newEnqiryCreate.get('LeadId')?.setValidators(null);
        }
      }
      this.newEnqiryCreate.updateValueAndValidity();
    }

    onChangeUN_Number(event:any){
      const unNumber=event ? event.label : '';
      this.newEnqiryCreate.get('UN_Name').setValue(unNumber);
    }
    CustomerName: string;
    getEnquiryCompanyNameId(companyid: number) {
      this.enquireCreateServ.getEnquiryCompanyNameId(companyid).subscribe(
        (name: any) => {
          this.CustomerName = name.companyName;
          this.newEnqiryCreate.patchValue({
            CompanyName: this.CustomerName,
            LeadName: this.CustomerName,
          });
          console.log("Customer NAme",this.CustomerName)
        },
        (error: any) => {
          console.error('Error retrieving company name:', error);
        }
      );
    }
    LeadName: string;
    getEnquiryLeadNameId(LeadId: number) {
      this.enquireCreateServ.getEnquiryLeadNameId(LeadId).subscribe(
        (name: any) => {
          this.LeadName = name.companyName;
          this.newEnqiryCreate.patchValue({
            LeadName: this.LeadName,
            CompanyName: this.LeadName,
          });
          console.log("Lead Name",this.LeadName)
        },
        (error: any) => {
          console.error('Error retrieving Lead Name:', error);
        }
      );
    }

    deleteContainerByID(id: any) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#867ceb",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Deleting customer with ID:", id);
          // Proceed with the deletion logic
          this.enquireCreateServ.deleteContainerId(id).subscribe(
            (response) => {
              console.log("Container deleted successfully");
              this.toastr.success("Container deleted successfully", "", {
                timeOut: 3000,
              });
            window.location.reload();
              
            },
            (error) => {
              console.error("Error deleting Container:", error);
              this.toastr.error("Failed to delete Container", "", {
                timeOut: 3000,
              });
            }
          );
        }
      });
    }
    deletePakagesId(id: any) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#867ceb",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Deleting Pakages with ID:", id);
          // Proceed with the deletion logic
          this.enquireCreateServ.deletePakagesId(id).subscribe(
            (response) => {
              console.log("Pakages deleted successfully");
              this.toastr.success("Pakages deleted successfully", "", {
                timeOut: 3000,
              });
            window.location.reload();
            },
            (error) => {
              console.error("Error deleting Pakages:", error);
              this.toastr.error("Failed to delete Pakages", "", {
                timeOut: 3000,
              });
            }
          );
        }
      });
    }
    deleteAddressId(id: any) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#867ceb",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Deleting Pakages with ID:", id);
          // Proceed with the deletion logic
          this.enquireCreateServ.deleteAddressId(id).subscribe(
            (response) => {
              console.log("Address deleted successfully");
              this.toastr.success("Address deleted successfully", "", {
                timeOut: 3000,
              });
            window.location.reload();
            },
            (error) => {
              console.error("Error deleting Pakages:", error);
              this.toastr.error("Failed to delete Pakages", "", {
                timeOut: 3000,
              });
            }
          );
        }
      });
    }
}
