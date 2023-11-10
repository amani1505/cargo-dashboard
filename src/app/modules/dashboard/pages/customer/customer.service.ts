import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from './store/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private _httpClient: HttpClient) {}


  createCustomer(payload: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}mteja`, payload);
  }

  getAllCustomer() {
    return this._httpClient.get<Customer[]>(`${environment.apiUrl}mteja`);
  }

  updateCustomer(payload: any) {
  
    return this._httpClient.patch(
      `${environment.apiUrl}mteja/${payload.id}`,
      payload
    );
  }

  deleteCustomer(id: string) {
    return this._httpClient.delete(
      `${environment.apiUrl}mteja/${id}`
    );
  }
}
