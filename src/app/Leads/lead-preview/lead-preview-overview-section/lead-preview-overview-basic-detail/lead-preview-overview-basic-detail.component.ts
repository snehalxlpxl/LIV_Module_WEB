import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { LeadCreateService, LeadSource } from 'app/Leads/lead-create/lead-create.service';
import { LeadStatus } from 'app/Leads/lead-create/LeadStatus';
import * as snippet1 from 'app/main/apps/companies/customers/customer-preview/customer-preview-overview-section/customer-preview-overview-basic-detail/customer-preview-overview-basic-detail-snippetcode';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lead-preview-overview-basic-detail',
  templateUrl: './lead-preview-overview-basic-detail.component.html',
  styleUrls: ['./lead-preview-overview-basic-detail.component.scss']
})
export class LeadPreviewOverviewBasicDetailComponent implements OnInit {
  showCopiedBadge = false;
  private lastPanelId: string = null;
  private defaultPanelId: string = 'panelShadow2';
  leadDetails: any;
  leadId: any;
  leadOwnerName:any;
  leadSources:any;
  LeadStatuses:any
  // public
  public contentHeader: object;
 
  // snippet code variables
  public _snippetCodeAccordion = snippet1.snippetCodeAccordion;
  public _snippetCodeShadow = snippet1.snippetCodeShadow;
  public _snippetCodeBorder = snippet1.snippetCodeBorder;
  public _snippetCodeMargin = snippet1.snippetCodeMargin;
 
  constructor(
    private leadService: LeadCreateService ,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) {}
 
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
   console.log('CustomerPreviewOverviewBasicDetailComponent initialized');

   this.leadId = this.route.snapshot.paramMap.get('id');
   console.log("BasicDetailleadId",this.leadId)
   this.fetchLeadDetails();
  //  this.fetchLeadSources();
  //  this.fetchLeadStatuses();

    // content header
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
  }
  fetchLeadDetails(): void {
    this.leadService.getLeadById(this.leadId).subscribe(
      (data) => {
        this.leadDetails = data;
        // Handle the fetched data, such as assigning to variables for display
        console.log("leadDetails",this.leadDetails)
        // console.log("leadDetails.leadOwnerId:",this.leadDetails.leadOwnerId)
        this.fetchLeadOwnerName(this.leadDetails.leadOwnerId);
        this.fetchLeadStatusName(this.leadDetails.leadStatusId);
        this.fetchLeadSourceName(this.leadDetails.leadSourceId)
      },
      (error) => {
        // Handle error
        console.error('Error deleting lead:', error);
      }
    );
  }

  leadSourceName:any;
  fetchLeadSourceName(leadSourceId: number): void {
    this.leadService.getLeadSourceById(leadSourceId).subscribe(
      (status:any) => {
        // console.log(status);
        this.leadSourceName = status.marketingSourceName;
        this.cd.detectChanges(); 
      },
      (error) => {
        console.error('Error fetching lead status:', error);
      }
    );
  }
leadStatusName:any;
fetchLeadStatusName(leadStatusId: number): void {
  this.leadService.getLeadStatusById(leadStatusId).subscribe(
    (status:any) => {
      console.log(status.leadStatusName)
      this.leadStatusName = status.leadStatusName;
      this.cd.detectChanges(); 
    },
    (error) => {
      console.error('Error fetching lead status:', error);
    }
  );
}
  fetchLeadOwnerName(leadOwnerId: string): void {
    // console.log("leadOwnerId:",leadOwnerId)
    this.leadService.getLeadOwner(leadOwnerId).subscribe(
      (ownerData) => {
        // console.log("ownerData:",ownerData);
        this.leadOwnerName = ownerData.userDisplayName; // Assuming the API returns the owner's name
        // console.log(this.leadOwnerName)
      },
      (error) => {
        // Handle error        
        console.error('Error deleting lead:', error);
      }
    );
  }
  capitalizeFirstLetter(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
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
// fetchLeadSources(): void {
//   this.leadService.getLeadSources().subscribe(
//     (data: LeadSource[]) => {
//       this.leadSources = data;
//       console.log("Lead Sources:", this.leadSources);
//     },
//     (error) => {
//       // Handle error
//       console.error('Error fetching lead sources:', error);
//     }
//   );
// }

// getLeadSourceName(leadSourceId: number): string {
//   const leadSource = this.leadSources.find(source => source.id === leadSourceId);
//   return leadSource ? leadSource.name : 'Unknown'; // Fallback if not found
// }

// fetchLeadStatuses(): void {
//   this.leadService.getLeadStatuses().subscribe(
//     (data: LeadStatus[]) => {
//       this.LeadStatuses = data;
//       console.log("Lead Sources:", this.LeadStatuses);
//     },
//     (error) => {
//       // Handle error
//       console.error('Error fetching lead sources:', error);
//     }
//   );
// }

// getLeadStatusName(leadStatusId: number): string {
//   const leadStatus = this.LeadStatuses.find(status => status.id === leadStatusId);
//   return leadStatus ? leadStatus.name : 'Unknown'; // Fallback if not found
// }

}
