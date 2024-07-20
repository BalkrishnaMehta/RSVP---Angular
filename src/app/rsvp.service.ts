import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Party,RSVP } from './rsvp.model';

@Injectable({
  providedIn: 'root'
})
export class RSVPService {
  private apiBaseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addRSVP(guestData: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/guests`, guestData);
  }
  

  getRSVPs(): Observable<RSVP[]> {
    return this.http.get<RSVP[]>(`${this.apiBaseUrl}/guests`);
  }

  addparties(partyData: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/parties`, partyData);
  }

  getparties(): Observable<Party[]> {
    return this.http.get<Party[]>(`${this.apiBaseUrl}/parties`);
  }
}
