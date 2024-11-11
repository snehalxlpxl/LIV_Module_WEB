import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Lead } from 'app/Leads/lead-create/lead-create-model/Lead';
import { LeadCreateService } from 'app/Leads/lead-create/lead-create.service';
import * as snippet1 from 'app/main/apps/companies/customers/customer-preview/customer-preview-overview-section/customer-preview-overview-address/customer-preview-overview-address-snippetcode';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lead-preview-overview-address',
  templateUrl: './lead-preview-overview-address.component.html',
  styleUrls: ['./lead-preview-overview-address.component.scss']
})
export class LeadPreviewOverviewAddressComponent implements OnInit {
  @Input() lead: string | undefined;

  leadDetails: any;
  leadId: any;
  billingAddress: string;
  countryName: any;
  stateName:any;
  countries: any[] = [];
  states: any[] = [];
  public json = require('feather-icons/dist/icons.json');
  public copyCodeStatus: boolean = false;
  public searchText;
  public data;
  // private
  private lastPanelId: string = null;
  private defaultPanelId: string = 'panelShadow2';

  // public
  public contentHeader: object;

  // snippet code variables
  public _snippetCodeAccordion = snippet1.snippetCodeAccordion;
  public _snippetCodeShadow = snippet1.snippetCodeShadow;
  public _snippetCodeBorder = snippet1.snippetCodeBorder;
  public _snippetCodeMargin = snippet1.snippetCodeMargin;

  constructor(

    private leadService: LeadCreateService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }


  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Accordion with shadow
   *
   * onPanelChange
   *
   * @param {NgbPanelChangeEvent} $event
   * @param panelShadow
   */
  onPanelChange($event: NgbPanelChangeEvent, panelShadow) {
    const activePanelId = $event.panelId;
    const activePanelElem = document.getElementById(activePanelId);

    if (!panelShadow.isExpanded(activePanelId)) {
      activePanelElem.parentElement.classList.add('open');
    }

    if (!this.lastPanelId) this.lastPanelId = this.defaultPanelId;

    if (this.lastPanelId) {
      const lastPanelElem = document.getElementById(this.lastPanelId);

      if (this.lastPanelId === activePanelId && $event.nextState === false)
        activePanelElem.parentElement.classList.remove('open');
      else if (this.lastPanelId !== activePanelId && $event.nextState === true) {
        lastPanelElem.parentElement.classList.remove('open');
      }
    }

    this.lastPanelId = activePanelId;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    console.log('CustomerPreviewOverviewAddressComponent initialized');
   
    this.contentHeader = {
      headerTitle: 'Accordion',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Components',
            isLink: true,
            link: '/'
          },
          {
            name: 'Accordion',
            isLink: false
          }
        ]
      }
    };
    this.data = this.json;
    this.contentHeader = {
      headerTitle: 'Feather Icons',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'UI',
            isLink: true,
            link: '/'
          },
          {
            name: 'Feather Icons',
            isLink: false
          }
        ]
      }
    };
  }
  copyToClipboard(text: string) {
    if (text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      // Optionally, display a success message using SweetAlert
      // Swal.fire('Copied!', 'The text has been copied to the clipboard.', 'success');
      this.toastr.success('The text has been copied to the clipboard.', 'Copied!');
    } else {
      // Handle cases where the text is null or empty
      // Swal.fire('Error', 'No text to copy.', 'error');
      this.toastr.error('No text to copy.', 'Error');
    }

}
}            