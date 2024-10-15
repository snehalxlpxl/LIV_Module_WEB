import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService } from 'app/auth/service/authentication.service';
import { SignUpData } from 'app/auth/models/SignUpData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-register-v2',
  templateUrl: './auth-register-v2.component.html',
  styleUrls: ['./auth-register-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthRegisterV2Component implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public registerForm: UntypedFormGroup;
  public submitted = false;
  public loading = false;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
  * @param {AuthenticationService} _authenticationService

   */
  constructor(private _coreConfigService: CoreConfigService, private _formBuilder: UntypedFormBuilder, private _authenticationService: AuthenticationService,    private _router: Router // Inject Router here

  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.f.email.value, this.f.password.value, this.f.username.value )
    const signUpData: SignUpData = {
      userId: 0,
    userName: this.f.username.value,
    userPassword: this.f.password.value,
    email: this.f.email.value,
    // contactId: 0,
    lastLoginDate: new Date().toISOString(),
    isActive: true,
    loginFailStreak: 0,
    loginFailTotal: 0,
    createdBy: 0,
    dateCreated:new Date().toISOString(),
    modifiedBy: 0,
    dateModified: new Date().toISOString(),
    deletedBy: 0,
    dateDeleted: new Date().toISOString(),
    isDeleted: false,
    // primaryOfficeId: 0,
    // profileId: 0,
    dateLocked: new Date().toISOString(),
    managerId: 0,
    userDisplayName: this.f.username.value
    };
  
    this.loading = true;
    // Call the signUp method from AuthService
    // this._authenticationService.signUp( signUpData).subscribe(
      this._authenticationService.signUp(signUpData).subscribe(
      response => {
        console.log('Sign Up Response:',response);
        // Handle further actions if necessary
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully signed up. Please log in to continue.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Navigate to the login page after the user clicks "OK"
          this._router.navigate(['/pages/authentication/login-v2']);
        });
      },
      error => {
        console.error('Sign Up Error:',error);
        // Handle error if necessary
      }
    );
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
