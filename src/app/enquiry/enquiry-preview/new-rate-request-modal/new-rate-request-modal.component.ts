import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnquireCreateService } from 'app/enquiry/enquire-create/enquire-create.service';
import { EnquiryService } from 'app/enquiry/enquiry.service';
import { SharedService } from 'app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-rate-request-modal',
  templateUrl: './new-rate-request-modal.component.html',
  styleUrls: ['./new-rate-request-modal.component.scss']
})
export class NewRateRequestModalComponent implements OnInit {

  @Input() enquiryID:number;
  newRateRequestForm:FormGroup;
  selectedAgent: any | null = null;
  sendTo: string = '';
  cc: string = '';
  draftContent: string = '';
  companyTypes: any[] = [];
  companyEmails: any;
  selectedCompanyId:any| null = null;
  selectedEmail: any;     
  userName: any | undefined;
  userId: any | undefined;    
  userEmail: any | undefined;    
  pakagesDetailsList: any[];
  containerTypes: string;

  constructor(public activeModal: NgbActiveModal,private enquiryService: EnquiryService,private userService: SharedService,
    public enquireCreateService:EnquireCreateService,private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    const userData = this.userService.getUserData();
    if (userData) {
      this.userName = this.userService.getUserName();
      this.userId = this.userService.getUserId();
      this.userEmail=this.userService.getUserEmail();
      console.log('User Data:', userData);
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
      console.log('User Email:', this.userEmail);
    } else {
      console.log('No user data found in localStorage');
    }
    this.formInit();
    this.getCompanyType();
    this.getEnquiryPakagesById(this.enquiryID);
    this.getEnquiryContainertById(this.enquiryID);
    
  }
  formInit(){
    this.newRateRequestForm = this.fb.group({
      companyTypes:0,
      sendTo:0,
      cc:'',
      draftContent: ['']

  
    });
  }
  closeModal(): void {
    this.activeModal.dismiss('Modal dismissed');
  }
  sendRateRequest(): void {
    Swal.fire({
      title: 'Confirm Sending Rate Request',
      text: 'Are you sure you want to send this rate request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, send it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const rateRequestData = {
          agent: this.selectedAgent,
          sendTo: this.sendTo,
          cc: this.cc,
          draft: this.draftContent,
        };

        console.log('Rate Request Data:', rateRequestData);

        // Simulate sending API request
        setTimeout(() => {
          this.activeModal.close(rateRequestData);
          Swal.fire('Sent!', 'Your rate request has been sent successfully.', 'success');
        }, 1000);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Rate request was not sent.', 'error');
      }
    });
  }
  getCompanyType(){
    this.enquiryService.getCompanyType().subscribe(
      (data) => {
        this.companyTypes = data;
        console.log("companyTypes",this.companyTypes);  
      },
      (error) => {
        console.error('Error fetching company types', error);
      }
    );
  }
  onAgentSelect(): void {
    if (this.selectedAgent) {
      // Assuming selectedAgent has 'companyTypeId' as the ID
      this.getCompaniesEmail(this.selectedAgent.companyTypeId);
    }
  }
  getCompaniesEmail(id: any): void {
    this.enquiryService.getCompaniesEmail(id).subscribe(
      (data) => {
        this.companyEmails = data.filter((email: any) => email && email.email && email.email.trim() !== '');
        console.log("Filtered Company Emails:", this.companyEmails);
      },
      (error) => {
        console.error('Error fetching company emails', error);
      }
    );
  }

  getEnquiryPakagesById(enquiryID:number){
    this.enquireCreateService.getEnquiryPakagesById(enquiryID).subscribe(
      (data: any[]) => {
        this.pakagesDetailsList = data
        console.log("pakages patch by Id", this.pakagesDetailsList)
      },
      (error) => console.error('Failed to fetch equipment', error)
    );
  }
  getEnquiryContainertById(enquiryID:number){
    this.enquireCreateService.getEnquiryContainertById(enquiryID).subscribe(
      (data: any[]) => {
        this.pakagesDetailsList = data;
      
        console.log("Container patch by Id", this.pakagesDetailsList)
        
        // this.newRateRequestForm.patchValue({
        //   draftContent:data[0].containerType,
        // })
      },
      (error) => console.error('Failed to fetch equipment', error)
    );
  }
  onSubmit(newRateRequest:any){
    console.log(newRateRequest.value);
  }
}
