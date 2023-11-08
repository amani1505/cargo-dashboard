import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cargo } from './store/cargo';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  constructor(private _httpClient: HttpClient) {}

  // CREATE
  createCargo(payload: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}mzigo`, payload);
  }

  // READ
  getAllCargo() {
    return this._httpClient.get<Cargo[]>(`${environment.apiUrl}mzigo`);
  }
}
