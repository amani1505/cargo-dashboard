import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Products } from './store/products';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private numberOfProductSubject = new Subject<number>();
  numberOfProduct: Observable<number> =
    this.numberOfProductSubject.asObservable();
  constructor(private _httpClient: HttpClient) {}

  createProduct(payload: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}products`, payload);
  }

  getAllProducts() {
    return this._httpClient.get<Products[]>(`${environment.apiUrl}products`);
  }
  getNumberOfProduct() {
    return this._httpClient
      .get<Products[]>(`${environment.apiUrl}products`)
      .subscribe((numberOfProduct) => {
        let instituteId = localStorage.getItem('instituteId');
        const products = numberOfProduct.filter(
          (products) => products?.institute.id === instituteId
        );

        this.numberOfProductSubject.next(products.length);
      });
  }

  updateProduct(payload: any) {
    return this._httpClient.patch(
      `${environment.apiUrl}products/${payload.id}`,
      payload
    );
  }

  deleteProduct(id: string) {
    return this._httpClient.delete(`${environment.apiUrl}products/${id}`);
  }
}
