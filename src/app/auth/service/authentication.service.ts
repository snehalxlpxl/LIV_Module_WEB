import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import { Token } from '@angular/compiler';
import { SignUpData } from '../models/SignUpData';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;
  userName: any;
  userId: any;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService, private router: Router,) {
    const storedUser = localStorage.getItem('currentUser');

    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);

    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    console.log("this.currentUserSubject.value", this.currentUserSubject.value)
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    return this._http
      // http://localhost:5154/api/User/AllUsers
      // .post<any>(`${environment.apiUrl}/users/authenticate`, { email, password })
      .post<{ token: string, user: any }>(`${environment.apiUrl}/Auth/login`, { email, password })
      .pipe(
        map(response => {
          const token = response.token;

          // Access user object
          const user = response.user;
          console.log("+++++++++++++++++++++++++user", user);
          // login successful if there's a jwt token in the response
          if (user && token) {

            console.log("+++++++++++++++++++++++++user", user);
            console.log("+++++++++++++++++++++++++user.token", token);

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            // localStorage.setItem('currentUser', user.token);
            // Update BehaviorSubject with the new user
            this.currentUserSubject.next(user);
            console.log('currentUserSubject after login:', this.currentUserSubject.value); // Debugging log


            // Display welcome toast!
            setTimeout(() => {
              const userData = JSON.parse(localStorage.getItem('currentUser'));
              if (userData) {
                this.userName = userData.userName;
                this.userId = userData.userId;
                console.log('User Name:', this.userName);
                console.log('User ID:', this.userId);
              } else {
                console.log('No user data found in localStorage');
              }
              this._toastrService.success(
                'You have successfully logged in ' +
                // user.role +
                ' user to Fretrack. Now you can start to explore. Enjoy! 🎉',
                '👋 Welcome, '
                + userData.userName+ '!'
                ,
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            // this.currentUserSubject.next(user);

          }

          return user;
        })
      );
  }

  //  login(email: string, password: string) {
  //   return this._http
  //     .post<{ token: string }>('http://localhost:5154/api/Auth/login', { email, password })
  //     .pipe(
  //       switchMap(response => {
  //         if (response && response.token) {
  //           // Store the token in local storage
  //           const token = response.token;
  //           localStorage.setItem('token', token);

  //           // Fetch user details using the token
  //           return this._http.get<{ email: string, username: string }>('http://localhost:5154/api/User/Details', {
  //             headers: { Authorization: `Bearer ${token}` }
  //           }).pipe(
  //             map(userDetails => {
  //               // Combine the token with user details
  //               const user: User = { token, ...userDetails };

  //               // Store the complete user info in local storage
  //               localStorage.setItem('currentUser', JSON.stringify(user));
  //               this.currentUserSubject.next(user);

  //               // Display welcome toast
  //               setTimeout(() => {
  //                 this._toastrService.success(
  //                   'You have successfully logged in as an user to Fretrack. Now you can start to explore. Enjoy! 🎉',
  //                   '👋 Welcome, ' + user.username + '!',
  //                   { toastClass: 'toast ngx-toastr', closeButton: true }
  //                 );
  //               }, 2500);

  //               return user;
  //             })
  //           );
  //         } else {
  //           throw new Error('Authentication failed');
  //         }
  //       })
  //     );
  // }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser')
    localStorage.clear()

    sessionStorage.clear();
    console.log("Logout")
    // notify
    this.currentUserSubject.next(null)
  }


  isLoggedIn(): boolean {
    // Check if the user's credentials or token are present in local storage
    return !!localStorage.getItem('currentUser');
  }
  signUp(signUpData: SignUpData) {
    return this._http
      // http://localhost:5154/api/User/signup
      .post<{ message: string }>(`${environment.apiUrl}/User/signup`, signUpData)
      .pipe(
        map(response => {
          if (response && response.message === "Sign up Successfully") {
            // setTimeout(() => {
            this._toastrService.success(
              'You have successfully signed up. Please log in to continue.',
              '🎉 Sign Up Successful!',
              { toastClass: 'toast ngx-toastr', closeButton: true }
            );
            // }, 2500);
          }
          return response;
        })
      );
  }

}
