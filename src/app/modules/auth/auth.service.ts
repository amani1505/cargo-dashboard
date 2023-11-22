import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUtils } from './auth.utils';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated: boolean = false;

  private userRoles: string[] = [];

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient // private _userService: UserService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  set role(role: string) {
    localStorage.setItem('role', role);
  }
  set id(id: string) {
    localStorage.setItem('id', id);
  }
  set instituteId(id: string) {
    localStorage.setItem('instituteId', id);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }
  get role(): string {
    return localStorage.getItem('role') ?? '';
  }
  get id(): string {
    return localStorage.getItem('id') ?? '';
  }

  get instituteId(): string {
    return localStorage.getItem('instituteId') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  //   forgotPassword(email: string): Observable<any> {
  //     return this._httpClient.post('api/auth/forgot-password', email);
  //   }

  /**
   * Reset password
   *
   * @param password
   */
  //   resetPassword(email: string, password: string): Observable<any> {
  //     return this._httpClient.post(`${environment.apiUrl}user/reset-password`, {
  //       email,
  //       password,
  //     });
  //   }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: any): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient
      .post(`${environment.apiUrl}auth/login`, credentials)
      .pipe(
        switchMap((response: any) => {
          // Store the access token in the local storage

          this.accessToken = response.accessToken;
          this.role = response.role;
          this.id = response.id;
          this.instituteId = response.institute.id;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          //   this._userService.user = response.user;

          // Return a new observable with the response
          return of(response);
        })
      );
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    // Sign in using the token
    return this._httpClient
      .get(`${environment.apiUrl}auth/signInWithToken`)
      .pipe(
        catchError(() =>
          // Return false
          of(false)
        ),
        switchMap((response: any) => {
          // Replace the access token with the new one if it's available on
          // the response object.
          //
          // This is an added optional step for better security. Once you sign
          // in using the token, you should generate a new one on the server
          // side and attach it to the response object. Then the following
          // piece of code can replace the token with the refreshed one.

          if (response.accessToken) {
            this.accessToken = response.thetoken.token;
          }

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          // this._userService.user = response;

          // Return true
          return of(true);
        })
      );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    localStorage.removeItem('instituteId');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user:any): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}auth/register`, user);
  }
  otpVerfication(otp: any): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}user/verify-code`, otp);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this._httpClient.post('api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists, and it didn't expire, sign in using it
    return this.signInUsingToken();
  }
  getUserRole(): Observable<string> {
    const role = localStorage.getItem('role');

    // Replace 'userRole' with the actual way you retrieve the user's role
    return of(role);
  }

  isUserInRoles(requiredRoles: string[]): boolean {
    return this.userRoles.some((userRole) => requiredRoles.includes(userRole));
  }
}
