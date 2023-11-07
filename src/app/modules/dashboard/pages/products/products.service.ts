import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Products } from './store/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}

  // CREATE
  createProduct(payload: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}products`, payload);
  }

  // READ
  getAllProducts() {
    return this._httpClient.get<Products[]>(`${environment.apiUrl}products`);
  }
}
