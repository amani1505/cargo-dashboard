import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cargo } from './store/cargo';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  constructor(private _httpClient: HttpClient) {}

  createCargo(payload: any) {
       return this._httpClient.post<any>(`${environment.apiUrl}mzigo`, payload);
  }

  getAllCargo() {
    return this._httpClient.get<Cargo[]>(`${environment.apiUrl}mzigo`);
  }

  updateCargo(id: string, payload: any) {
    return this._httpClient.patch(`${environment.apiUrl}mzigo/${id}`, payload);
  }

  deleteCargo(id: string) {
    return this._httpClient.delete(`${environment.apiUrl}mzigo/${id}`);
  }
}
