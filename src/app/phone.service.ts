import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  private baseUrl = 'http://localhost:8080/api/v1/phonenumbers';

  constructor(private http: HttpClient) { }

  getPhoneList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAllPhoneCombinations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }


}
