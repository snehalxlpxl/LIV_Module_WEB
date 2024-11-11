import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeeCount, Industry, LeadCreateService, LeadSource, ServiceType } from "./lead-create.service";
import { Lead } from "./lead-create-model/Lead";
import { Observable, Subject, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from "rxjs/operators";
import { NgSelectComponent } from "@ng-select/ng-select";
import { ToastrService } from "ngx-toastr";
import { CustomerCreateService } from "app/main/apps/companies/customers/customer-create/customer-create.service";
import { LeadStatus } from "./LeadStatus";
import { id } from "@swimlane/ngx-datatable";
import { Console } from "console";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { ErrorLogService } from "app/auth/service/errorLog.service";
import { AppInitService } from "app/app-init.service";
@Component({
  selector: 'app-lead-create',
  templateUrl: './lead-create.component.html',
  styleUrls: ['./lead-create.component.scss']
})
export class LeadCreateComponent implements OnInit {
  userName: any | undefined;
  userId: any | undefined;
  leadStatuses: any;
  submitted = false;
  leadSources: any;
  serviceTypes: any;
  employeeCounts: any;
  countries: any;
  states: any;
  leadForm: FormGroup;
  salesPerson: any[];
  industries: any;
  locationMasterData: any;
  isEditMode = false;
  leadId: any;

  private searchTerms = new Subject<string>();
  @ViewChild("select") select: NgSelectComponent;
  constructor(
    private appInitService: AppInitService,
    private leadCreateService: LeadCreateService,
    private errorLogService:ErrorLogService,
    // private apiService: CustomerCreateService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private renderer: Renderer2,
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

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
    this.route.paramMap.subscribe(params => {
      this.leadId = params.get('id');
      if (this.leadId) {
        this.isEditMode = true;
        this.loadLeadDetails(this.leadId);
      }
    });
    this.leadForm = this.fb.group({
      salesPerson: ['', Validators.required],
      companyName: ['', Validators.required],
      leadStatus: ['', Validators.required],
      leadSource: ['', Validators.required],
      contactName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Mobile number validation
      website: ['', [Validators.required,Validators.pattern('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$')]], // Website URL validation
      serviceType: ['', Validators.required],
      monthlyVolume: ['', Validators.required],
      pol: ['', Validators.required],
      pod: ['', Validators.required],
      industry: ['', Validators.required],
      annualRevenue: ['', Validators.required],
      employeeCount: ['', Validators.required],
      emailOptIn: [false, Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      street: ['', Validators.required]
    });
    // this.loadSalesPerson();
    // this.getLocationMasterData();
    this.salesPerson = this.appInitService.salesPerson;
    this.locationMasterData = this.appInitService.locationMasterData; //appinitilizer
    this.countries = this.appInitService.countries;

    this.getLeadStatus();
    this.getLeadSources();
    // this.fetchLeadSourceName(this.leadId);
    // this.fetchLeadStatusName(this.leadId);
    this.getServiceTypes();
    this.getEmployeeCounts();
    // this.getCountries();
    this.getIndustries();
    // this.getStates(id);
  }

  loadLeadDetails(id: any): void {
    this.leadCreateService.getLeadById(id).subscribe((lead: any) => {
      console.log('Lead patchValueData:', lead);
      this.leadForm.patchValue({
        salesPerson: lead.leadOwnerId,
        companyName: lead.companyName,
        leadStatus: lead.leadStatusId,
        leadSource: lead.leadSourceId,
        contactName: lead.firstName,
        email: lead.email,
        mobile: lead.phone1,
        website: lead.website,
        serviceType: lead.shipmentType,
        monthlyVolume: lead.monthlyTeus,
        pol: lead.pol,
        pod: lead.pod,
        industry: lead.industryId,
        annualRevenue: lead.annualRevenue,
        employeeCount: lead.employeeCount,
        emailOptIn: lead.emailOptIn,
        country: lead.countryId,
        state: lead.stateId,
        city: lead.cityName,
        zipcode: lead.zipCode,
        street: lead.street,
        // patch other form controls
      });
      this.fetchStatesByCountryId(lead.countryId, lead.stateId);
      // console.log("patchValue",this.leadForm.patchValue)
    });
  }
  fetchStatesByCountryId(countryId: number, stateId: number) {
    this.leadCreateService.getStatesByCountryId(countryId).subscribe(
      (states: any[]) => {
        this.states = states; // Update the states array

        // Now that states are loaded, patch the stateId to the form
        this.leadForm.patchValue({
          state: stateId
        });
      },
      error => {
        console.error('Error fetching states:', error);
      }
    );
  }

  saveLead(leadForm: FormGroup): void {
    this.submitted = true;

    if (this.leadForm.invalid) {
      // we can use below in reactive form
      // this.leadForm.markAllAsTouched();
      // return;

      // we can use below in reactive & template driven form also
      let key = Object.keys(leadForm.controls);
      console.log(key); //array of the keys (names) of all controls 
      key.filter((data) => {
        console.log("data", data);
        let control = leadForm.controls[data];
        if (control.errors != null) {
          control.markAsTouched();
        }
      });
      return;

  }
    if (this.isEditMode) {

      console.log("isEditMode", this.isEditMode);
      const formData = leadForm.value;
      const leadData = {
        leadId: this.leadId,
        leadOwnerId: formData.salesPerson,
        companyName: formData.companyName,
        leadStatusId: formData.leadStatus,
        leadSourceId: formData.leadSource,
        firstName: formData.contactName,
        email: formData.email,
        phone1: formData.mobile,
        website: formData.website,
        shipmentType: formData.serviceType,
        monthlyTeus: Number(formData.monthlyVolume),
        pol: formData.pol,
        pod: formData.pod,
        industryId: formData.industry,
        annualRevenue: Number(formData.annualRevenue),
        employeeCount: formData.employeeCount,
        emailOptIn: formData.emailOptIn,
        countryId: formData.country,
        stateId: formData.state,
        cityName: formData.city,
        zipcode: formData.zipcode,
        street: formData.street,
        userId:this.userId,
      };
      console.log(leadData);
      this.leadCreateService.updateLead(this.leadId, leadData).subscribe(
        (response) => {
          Swal.fire('Success', 'Updated successfully', 'success');

          console.log('Lead updated successfully:', response);
          // Handle success, 
          this.router.navigate([`/lead/preview`, this.leadId]);

        },
        (error) => {
          console.error('Error updating lead:', error);
          Swal.fire('Error', 'Failed to update', 'error');
          // Handle error, e.g., show an error message
        }
      );
    } else {
      const formData = leadForm.value;
      console.log(formData);
      const leadData = {
        leadId: 0,
        leadOwnerId: formData.salesPerson,
        companyName: formData.companyName,
        leadStatusId: formData.leadStatus,
        leadSourceId: formData.leadSource,
        firstName: formData.contactName,
        email: formData.email,
        phone1: formData.mobile,
        website: formData.website,
        shipmentType: formData.serviceType,
        monthlyTeus: Number(formData.monthlyVolume),
        pol: formData.pol,
        pod: formData.pod,
        industryId: formData.industry,
        annualRevenue: Number(formData.annualRevenue),
        employeeCount: formData.employeeCount,
        emailOptIn: formData.emailOptIn,
        countryId: formData.country,
        stateId: formData.state,
        cityName: formData.city,
        zipcode: formData.zipcode,
        street: formData.street,
        userId:this.userId,
      }
      console.log(leadData);
      this.leadCreateService.createLead(leadData).subscribe(
        (response) => {
          Swal.fire('Success', 'Added successfully', 'success');
          console.log('Lead saved successfully:', response);
          const newLeadId = response?.leadId; // Adjust according to your response structure
          this.router.navigate([`/lead/preview`, newLeadId]);
        },
        (error) => {
          console.error('Error saving lead:', error);
          Swal.fire('Error', 'Failed to add', 'error');
        }
      );
    }
  }

  // loadSalesPerson() {
  //   this.leadCreateService.getVwAllSalesPerson().subscribe((data: any[]) => {
  //     this.salesPerson = data;
  //     console.log("sales Person", this.salesPerson);
  //   });
  // }
  // getLocationMasterData(): void {
  //   this.leadCreateService.getAllLocationMaster().subscribe(
  //     data => {
  //       this.locationMasterData = data;
  //       console.log("locationMasterData", this.locationMasterData);
  //     },
  //     error => {
  //       console.error('Error fetching location master data', error);
  //     }
  //   );
  // }
  getLeadStatus(): void {
    this.leadCreateService.getLeadStatuses().subscribe(
      (data: LeadStatus[]) => {
        this.leadStatuses = data;
        console.log("leadStatuses", this.leadStatuses)
      },
      (error) => {
        console.error('Failed to fetch lead statuses', error);
      }
    );
  }
  getLeadSources() {
    this.leadCreateService.getMarketingSources().subscribe(
      (data: LeadSource[]) => {
        this.leadSources = data
        console.log("leadSources", this.leadSources)
      },
      (error) => console.error('Failed to fetch lead sources', error)
    );
  }
  getServiceTypes() {
    this.leadCreateService.getServiceTypes().subscribe(
      (data: ServiceType[]) => {
        this.serviceTypes = data
        console.log("serviceTypes", this.serviceTypes)
      },
      (error) => console.error('Failed to fetch service types', error)
    );
  }
  getEmployeeCounts() {
    this.leadCreateService.getEmployeeCounts().subscribe(
      (data: EmployeeCount[]) => {
        this.employeeCounts = data
        console.log("employeeCounts", this.employeeCounts)
      },

      (error) => console.error('Failed to fetch employee counts', error)
    );
  }
  // getCountries(): void {
  //   this.leadCreateService.getCountries().subscribe(
  //     (data) => {
  //       this.countries = data;
  //       console.log('Countries:', this.countries);
  //     },
  //     (error) => {
  //       console.error('Error fetching countries', error);
  //     }
  //   );
  // }

  getStates(countryId: 0): void {
    this.leadCreateService.getStatesByCountryId(countryId).subscribe(
      (data) => {
        this.states = data;
        console.log('States for Country ID:', countryId, this.states);
      },
      (error) => {
        console.error('Error fetching states', error);
      }
    );
  }
  onCountryChange(country: any) {
    const countryId = country.countryId;
    console.log('Country changed:', countryId);
    this.getStates(countryId);
  }
  getIndustries() {
    this.leadCreateService.getIndustries().subscribe(
      (data: Industry[]) => {
        this.industries = data
        console.log("employeeCounts", this.industries)
      },

      (error) => console.error('Failed to fetch employee counts', error)
    );
  }
  
  leadSourceName:any;
  fetchLeadSourceName(leadSourceId: number): void {
    this.leadCreateService.getLeadSourceById(leadSourceId).subscribe(
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
  this.leadCreateService.getLeadStatusById(leadStatusId).subscribe(
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
}

