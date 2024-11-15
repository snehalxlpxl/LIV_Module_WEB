import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-enquiry-preview-rates',
  templateUrl: './enquiry-preview-rates.component.html',
  styleUrls: ['./enquiry-preview-rates.component.scss']
})
export class EnquiryPreviewRatesComponent implements OnInit {
  rateRequests = [
    {
      rateId: 'ME2500084-R1',
      agent: 'MAERSK LINES LTD.',
      requestDate: '2024-10-13',
      receivedDate: '2024-10-14',
      sentDate: null,
      status: 'Pending'
    },
    {
      rateId: 'ME2500084-R2',
      agent: 'HAPAG LLOYD',
      requestDate: '2024-10-13',
      receivedDate: '2024-10-15',
      sentDate: null,
      status: 'Pending'
    },
    {
      rateId: 'ME2500084-R3',
      agent: 'QUICKCLEAR AGENCY',
      requestDate: '2024-10-13',
      receivedDate: null,
      sentDate: null,
      status: 'Awaiting Rates'
    }
  ];

  searchValue: string = '';
  selectedOption: number = 10;
  public ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
