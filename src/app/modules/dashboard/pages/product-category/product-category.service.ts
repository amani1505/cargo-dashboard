import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductCategory } from './store/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(private _httpClient: HttpClient) {}

  // CREATE
  createProductCategory(payload: any) {
    return this._httpClient.post<any>(
      `${environment.apiUrl}product-category`,
      payload
    );
  }

  // READ
  getAllProductCategory() {
    return this._httpClient.get<ProductCategory[]>(
      `${environment.apiUrl}product-category`
    );
  }
}
