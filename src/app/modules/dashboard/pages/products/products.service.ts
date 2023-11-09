import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Products } from './store/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}

  createProduct(payload: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}products`, payload);
  }

  getAllProducts() {
    return this._httpClient.get<Products[]>(`${environment.apiUrl}products`);
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
