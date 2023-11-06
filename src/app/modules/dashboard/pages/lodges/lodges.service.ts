import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lodge } from './store/lodge/lodge';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LodgesService {
  constructor(private _httpClient: HttpClient) {}

  // CREATE
  createLodge(payload: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}lodge`, payload);
  }

  // READ
  getLodge() {
    return this._httpClient.get<Lodge[]>(`${environment.apiUrl}lodge`);
  }
 
}
