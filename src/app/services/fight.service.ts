import { Fight, Fighter, Strats } from './../model/fight';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class FightService {
  constructor(private http: HttpClient) {}

  findById(id: any): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/fights/${id}`);
  }

  allFighters(): Observable<Fighter[]> {
    return this.http.get<Fighter[]>(`${API_CONFIG.baseUrl}/fighters`);
  }

  fighterById(id: any): Observable<Fighter> {
    return this.http.get<Fighter>(`${API_CONFIG.baseUrl}/fighters/${id}`);
  }

  fighterStratsById(id: any): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/fighters/strats/${id}`);
  }

  create(fight: Fight): Observable<Fight> {
    return this.http.post<Fight>(`${API_CONFIG.baseUrl}/fights`, fight);
  }

  updateStrats(strats: Strats): Observable<Strats> {
    return this.http.put<Strats>(
      `${API_CONFIG.baseUrl}/fighters/${strats.id}`,
      strats
    );
  }

  updatePBP(id: any): Observable<any> {
    return this.http.put<any>(`${API_CONFIG.baseUrl}/fights/${id}/sim`, null);
  }
}
