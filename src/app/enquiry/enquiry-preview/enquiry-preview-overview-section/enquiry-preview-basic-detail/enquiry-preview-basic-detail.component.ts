import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enquiry-preview-basic-detail',
  templateUrl: './enquiry-preview-basic-detail.component.html',
  styleUrls: ['./enquiry-preview-basic-detail.component.scss']
})
export class EnquiryPreviewBasicDetailComponent implements OnInit {
  enquiryRows = [
    { enquiryId: '250084', customerName: 'Global Motors', industry: 'Automobile Parts', serviceType: 'FCL - Export', requirement: '4 X 40HC', status: 'Awaiting Rates' },
    { enquiryId: '250085', customerName: 'Classic Marbles', industry: 'Marbles & Stones', serviceType: 'FCL - Import', requirement: '4 X 40HC', status: 'Closed' },
    { enquiryId: '250086', customerName: 'Budweiser Beverages', industry: 'Beverages & Alcohol', serviceType: 'Air - Export', requirement: '1740 KGS', status: 'Quotation Sent' },
    // Add more data as required
  ];
  currentEnquiry: any = null; 
  message = "Enquiry Overview"; // Example message

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    const enquiryId = this.route.snapshot.paramMap.get('id');

    // Find the matching enquiry from the enquiryRows array
    if (enquiryId) {
      this.currentEnquiry = this.enquiryRows.find(enquiry => enquiry.enquiryId === enquiryId);
      console.log("Current Enquiry",this.currentEnquiry);
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
}
