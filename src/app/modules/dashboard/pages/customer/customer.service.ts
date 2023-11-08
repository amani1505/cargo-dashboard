import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from './store/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private _httpClient: HttpClient) {}

  // CREATE
  createCustomer(payload: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}mteja`, payload);
  }

  // READ
  getAllCustomer() {
    return this._httpClient.get<Customer[]>(`${environment.apiUrl}mteja`);
  }
}
