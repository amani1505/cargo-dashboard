import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductCategory } from './store/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(private _httpClient: HttpClient) {}

  createProductCategory(payload: any) {
    return this._httpClient.post<any>(
      `${environment.apiUrl}product-category`,
      payload
    );
  }

  getAllProductCategory() {
    return this._httpClient.get<ProductCategory[]>(
      `${environment.apiUrl}product-category`
    );
  }

  updateProductCategory(payload: any) {
  
    return this._httpClient.patch(
      `${environment.apiUrl}product-category/${payload.id}`,
      payload
    );
  }

  deleteProductCategory(id: string) {
    return this._httpClient.delete(
      `${environment.apiUrl}product-category/${id}`
    );
  }
}
