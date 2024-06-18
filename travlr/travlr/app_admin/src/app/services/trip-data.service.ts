import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { Trip } from '../models/trip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  // Authentication methods
  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post<AuthResponse>(url, user)
      .toPromise()
      .catch(this.handleError);
  }

  // Trip methods
  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`);
  }

  public addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBaseUrl}/trips`, trip);
  }

  public getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}/trips/${tripCode}`);
  }

  public updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBaseUrl}/trips/${trip.code}`, trip);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
