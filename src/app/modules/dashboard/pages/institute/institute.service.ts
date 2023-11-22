import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Institute } from './store/institute';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstituteService {
  private dataSubject = new Subject<Institute>();
  data: Observable<Institute> = this.dataSubject.asObservable();

  constructor(private _httpClient: HttpClient) {}

  createInstitute(payload: any) {
    return this._httpClient.post<any>(
      `${environment.apiUrl}institution`,
      payload
    );
  }

  getAllInstitute() {
    return this._httpClient.get<Institute[]>(
      `${environment.apiUrl}institution`
    );
  }
  getInstitute() {
    let id = localStorage.getItem('instituteId');
    return this._httpClient
      .get<Institute>(`${environment.apiUrl}institution/${id}`)
      .subscribe((institute) => {
        this.dataSubject.next(institute);
      });
  }

  updateInstitute(payload: any) {
    return this._httpClient.patch(
      `${environment.apiUrl}institution/${payload.id}`,
      payload
    );
  }

  deleteInstitute(id: string) {
    return this._httpClient.delete(`${environment.apiUrl}institution/${id}`);
  }
 
}
