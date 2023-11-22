import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from './store/customer';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private numberOfCustomerSubject = new Subject<number>();
  numberOfCustomer: Observable<number> =
    this.numberOfCustomerSubject.asObservable();
  constructor(private _httpClient: HttpClient) {}

  createCustomer(payload: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}mteja`, payload);
  }

  getAllCustomer() {
    return this._httpClient.get<Customer[]>(`${environment.apiUrl}mteja`);
  }
  getNumberOfCustomer() {
    let instituteId = localStorage.getItem('instituteId');
    return this._httpClient
      .get<Customer[]>(`${environment.apiUrl}mzigo`)
      .subscribe((numberOfCustomer) => {
        const customer = numberOfCustomer.filter(
          (customer) => customer.institute?.id === instituteId
        );
        this.numberOfCustomerSubject.next(customer.length);
      });
  }

  updateCustomer(payload: any) {
    return this._httpClient.patch(
      `${environment.apiUrl}mteja/${payload.id}`,
      payload
    );
  }

  deleteCustomer(id: string) {
    return this._httpClient.delete(`${environment.apiUrl}mteja/${id}`);
  }
}
