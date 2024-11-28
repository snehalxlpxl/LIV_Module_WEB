import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EquiryPreviewBasicDetailService } from './equiry-preview-basic-detail.service';

@Component({
  selector: 'app-enquiry-preview-basic-detail',
  templateUrl: './enquiry-preview-basic-detail.component.html',
  styleUrls: ['./enquiry-preview-basic-detail.component.scss']
})
export class EnquiryPreviewBasicDetailComponent implements OnInit {

  currentEnquiry: any = null; 
  message = "Enquiry Overview"; // Example message

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private apiService:EquiryPreviewBasicDetailService

  ) { }

  ngOnInit(): void {
    const enquiryId = this.route.snapshot.paramMap.get('id');

    // Find the matching enquiry from the enquiryRows array
    if (enquiryId) {
 
      this.getDetalByVIew(parseInt(enquiryId));
    }

    if (!this.currentEnquiry) {
      // Handle the case where the enquiry is not found (optional)
      this.message = "Enquiry not found!";
    }
  }

  copyToClipboard(text: string) {
    if (text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.toastr.success('The text has been copied to the clipboard.', 'Copied!');
    } else {
      this.toastr.error('No text to copy.', 'Error');
    }

}

basicDetail:any[];
getDetalByVIew(id:number){
  this.apiService.getDetalByVIew(id).subscribe((data: any[]) => {
    this.basicDetail=data;
    console.log("basic Details ", this.basicDetail);
    //get company details if company Id
    // console.log("this.basicDtail[0].conpanyType",this.basicDtail[0].conpanyType)
    if(this.basicDetail[0].conpanyType=="Customer"){
      console.log("this.basicDetail[0].companyOrLeadI",this.basicDetail[0].companyOrLeadId)
      this.getCompanyDataById(this.basicDetail[0].companyOrLeadId);
    }else{
      console.log("this.basicDetail[0].companyOrLeadI",this.basicDetail[0].companyOrLeadId)
      this.getLeadDataById(parseInt(this.basicDetail[0].companyOrLeadId));
    }
  });
}

companyData:any[];
getCompanyDataById(id:number){
  if(id){
    this.apiService.getCompanyDataById(id).subscribe((data: any[]) => {
      this.companyData=data;
      console.log("companyData ", this.companyData);
    
    });
  }
  
}

leadData:any[];
getLeadDataById(id:number){
  if(id){
    this.apiService.getLeadDataById(id).subscribe((data: any[]) => {
      this.leadData=data;
      console.log("leadData ", this.leadData);
    
    });
  }
  
}
}
