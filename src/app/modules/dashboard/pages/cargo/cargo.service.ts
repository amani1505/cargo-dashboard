import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cargo } from './store/cargo';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  private numberOfCargoSubject = new Subject<number>();
  numberOfCargo: Observable<number> = this.numberOfCargoSubject.asObservable();
  constructor(private _httpClient: HttpClient) {}

  createCargo(payload: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}mzigo`, payload);
  }

  getAllCargo() {
    return this._httpClient.get<Cargo[]>(`${environment.apiUrl}mzigo`);
  }
  getNumberOfCargo() {
    let instituteId = localStorage.getItem('instituteId');
    return this._httpClient
      .get<Cargo[]>(`${environment.apiUrl}mzigo`)
      .subscribe((numberOfCargo) => {
        const cargo = numberOfCargo.filter(
          (cargo) => cargo.institute.id === instituteId
        );

        this.numberOfCargoSubject.next(cargo.length);
      });
  }

  updateCargo(id: string, payload: any) {
    return this._httpClient.patch(`${environment.apiUrl}mzigo/${id}`, payload);
  }

  deleteCargo(id: string) {
    return this._httpClient.delete(`${environment.apiUrl}mzigo/${id}`);
  }
}
