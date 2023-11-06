import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guest } from './store/guest/guest';
import { environment } from 'src/environments/environment';
import { Employee } from './store/employee/employee';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _httpClient: HttpClient) {}

  /**====================== GUEST API CALLS ====================== */
  // READ
  getGuests() {
    return this._httpClient.get<Guest[]>(`${environment.apiUrl}guest`);
  }

  /**====================== EMPLOYEE API CALLS ====================== */
  //READ

  getEmployees() {
    return this._httpClient.get<Employee[]>(`${environment.apiUrl}employee`);
  }
}
