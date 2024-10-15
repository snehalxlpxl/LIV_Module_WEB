import { Component, OnInit,  ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { LeadsListService } from './leads-list.service';
import { Lead } from './lead';
import { CoreConfigService } from '@core/services/config.service';
import { HttpClient } from '@angular/common/http';
import { LeadCreateService, LeadSource } from '../lead-create/lead-create.service';
import { LeadStatus } from '../lead-create/LeadStatus';
import { CustomerCreateService } from 'app/main/apps/companies/customers/customer-create/customer-create.service';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.scss']
})
export class LeadsListComponent implements OnInit {
  userName: any | undefined;
  userId: any | undefined;
  private _unsubscribeAll: Subject<any>;
  public data: Lead[];
  public rows: Lead[];
  public tempData: Lead[];
  public tempFilterData: Lead[];
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = '';
  salesPerson:any;
  leadStatuses:any;
  marketingSources:any;
  leads:any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  public previousStatusFilter = '';

  /**
   * Constructor
   *
   * @param {LeadsListService} _leadsListService
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _leadsListService: LeadsListService,
    private _coreConfigService: CoreConfigService,
    private _httpClient: HttpClient,
    private apiService: CustomerCreateService,
    private leadCreateService: LeadCreateService,

  ) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const val = (event.target.value || '').toLowerCase();
  
    // filter our data
    const temp = this.tempData.filter(d => {
      return d.status.toLowerCase().includes(val) || !val;
    });
  
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    if (this.table) {
      this.table.offset = 0;
    }
  }

  /**
   * Filter By Status
   *
   * @param event
   */
  filterByStatus(event) {
    const filter = event ? event.value : '';
    this.previousStatusFilter = filter;
    this.tempFilterData = this.filterRows(filter);
    this.rows = this.tempFilterData;
  }

  /**
   * Filter Rows
   *
   * @param statusFilter
   */
  filterRows(statusFilter): any[] {
    // Reset search on select change
    this.searchValue = '';
  
    statusFilter = (statusFilter || '').toLowerCase();
  
    return this.tempData.filter(row => {
      return row.leadOwner.toLowerCase().includes(statusFilter) || !statusFilter;
    });
  }
  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
  } else {
      console.log('No user data found in sessionStorage');
  }

    // this.fetchLeadSources();
    // this.fetchLeadStatus();
    this.getDataTableRows();
    // this.fetchLeadOwnerName();
    // this.loadSalesPerson();
  }
  // deleteLead(leadId: any): void {
  //   if (confirm('Are you sure you want to delete this lead?')) {
  //     console.log(leadId,"leadId")
  //     this._leadsListService.deleteLead(leadId).subscribe(
  //       (response) => {
  //         Swal.fire('Success', 'Deleted successfully', 'success');

  //         console.log('Lead deleted successfully:', response);
  //         // You might want to refresh the list or remove the deleted lead from the UI
  //         // this.loadLeads(); // Reload or refresh the lead list after deletion
  //         // window.location.reload(); 
  //         this.getDataTableRows();       
  //       },
  //       (error) => {
  //         Swal.fire('Error', 'Failed to delete', 'error');
  //         console.error('Error deleting lead:', error);
  //         // Handle error, e.g., show an error message
  //       }
  //     );
  //   }
  // }
  deleteLead(leadId: number): void {
    if (confirm('Are you sure you want to delete this lead?')) {
      const apiUrl = `${environment.apiUrl}/Leads/${leadId}/leadDelete`;

      this._httpClient.put(apiUrl, {}).subscribe(
        (response) => {
          Swal.fire('Success', 'Lead marked as deleted successfully', 'success');
          console.log('Lead marked as deleted:', response);
          this.getDataTableRows(); // Refresh the data table or UI
        },
        (error) => {
          Swal.fire('Error', 'Failed to delete lead', 'error');
          console.error('Error deleting lead:', error);
        }
      );
    }
  }

  getDataTableRows(){
    this._leadsListService.getDataTableRows().then((rows: Lead[]) => {
      this.data = rows;
      this.rows = this.data;
      this.tempData = this.rows;
      this.tempFilterData = this.rows;
      console.log("Leads",this.data);
    }).catch(error => {
      console.error('Error fetching leads data:', error);
    });
  }
 

  leadSourcesMap = new Map<number, string>();

  fetchLeadSources() {

    // this._httpClient.get<LeadSource[]>(`${environment.apiUrl}/Leads/lead-sources`)
    // .subscribe((data: LeadSource[]) => {
    //   this.leadSourcesMap = new Map(data.map(source => [source.id, source.name]));
    //   console.log('Lead Sources:', this.leadSourcesMap);
    // });
    this.leadCreateService.getMarketingSources().subscribe(
      (data) => {
        this.marketingSources = data;
        console.log('Marketing Sources:', this.marketingSources);
      },
      (error) => {
        console.error('Error fetching marketing sources', error);
      }
    );
  }
  leadStatusMap = new Map<number, string>();

  fetchLeadStatus() {

    // this._httpClient.get<LeadStatus[]>(`${environment.apiUrl}/Leads/LeadStatus`)
    // .subscribe((data: LeadSource[]) => {
    //   this.leadStatusMap = new Map(data.map(source => [source.id, source.name]));
    //   console.log('Lead leadStatusMap:', this.leadStatusMap);
    // });
    this.leadCreateService.getLeadStatuses().subscribe(
      (data) => {
        this.leadStatuses = data;
        console.log('Lead Statuses:', this.leadStatuses);
      },
      (error) => {
        console.error('Error fetching lead statuses', error);
      }
    );
  }
  
  // fetchLeadOwnerName() {

  //   this._httpClient.get<MarketingSource[]>(`${environment.apiUrl}/Leads/GetMarketingSources`)
  //   .subscribe((data: MarketingSource[]) => {
  //     this.leadStatusMap = new Map(data.map(source => [source.id, source.name]));
  //     console.log('Lead leadStatusMap:', this.leadStatusMap);
  //   });
  // }
  loadSalesPerson() {
    this.apiService.getSalesPerson().subscribe((data: any[]) => {
      this.salesPerson = new Map(data.map(item => [item.userId, item.userDisplayName]));
      console.log("sales Person", this.salesPerson);
    });
  }
}
