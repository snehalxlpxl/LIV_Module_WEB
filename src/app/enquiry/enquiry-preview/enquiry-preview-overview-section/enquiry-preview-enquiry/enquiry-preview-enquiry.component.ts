import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnquiryPreviewEnquiryService } from './enquiry-preview-enquiry.service';

@Component({
  selector: 'app-enquiry-preview-enquiry',
  templateUrl: './enquiry-preview-enquiry.component.html',
  styleUrls: ['./enquiry-preview-enquiry.component.scss']
})
export class EnquiryPreviewEnquiryComponent implements OnInit {

  message = "Enquiry Overview"; // Example message
  currentEnquiry: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiService:EnquiryPreviewEnquiryService
  ) { }

  ngOnInit(): void {
    const enquiryId = this.route.snapshot.paramMap.get('id');

    // Find the matching enquiry from the enquiryRows array
    if (enquiryId) {
      // this.currentEnquiry = this.enquiryRows.find(enquiry => enquiry.enquiryId === enquiryId);
      this.getEnquiryDetail(parseInt(enquiryId));
      this.getEnquiryContainer(parseInt(enquiryId));
      this.getEnquiryPakage(parseInt(enquiryId));
     
    }

    // if (!this.currentEnquiry) {
    //   // Handle the case where the enquiry is not found (optional)
    //   this.message = "Enquiry not found!";
    // }
  }

  getEnquiryDetail(id:number){
    this.apiService.getEnqDetailById(id).subscribe((data: any[]) => {
      this.currentEnquiry=data[0];
      console.log("currentEnquiry ", this.currentEnquiry);
   
    });
  }
  ContainerData: any[];
  getEnquiryContainer(id:number){
    this.apiService.getContainerById(id).subscribe((data: any) => {
      this.ContainerData=data;
      console.log("ContainerEnquiry ", this.ContainerData);
   
    });
  }
  PakageData: any[];
  grossWeightTotal: number = 0;
  cbmTotal: number = 0;
  getEnquiryPakage(id:number){
    this.apiService.getPakageById(id).subscribe((data: any) => {
      this.PakageData=data;
      console.log("PakageData ", this.PakageData);
        // Calculate totals
    this.grossWeightTotal = this.PakageData.reduce((acc, curr) => acc + (curr.grossWeight || 0), 0);
    this.cbmTotal = this.PakageData.reduce((acc, curr) => acc + (curr.cbm|| 0), 0); 
    });
  }
}
