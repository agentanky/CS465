import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trips } from '../data/trips';
import { TripDataService } from '../services/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  template: `
  <div *ngIf="isLoggedIn()">
    <button (click)="addTrip()" class="btn btn-info">Add Trip</button>
  </div>
  <div class="row">
    <div *ngFor="let trip of trips" class="col-3">
      <app-trip-card [trip]="trip" class="card-deck mt-2"></app-trip-card>
    </div>
  </div>
  <div *ngIf="message" class="alert alert-info mt-3">{{ message }}</div>
  `,
  styles: ``,
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips: Array<any> = trips;
  message: string = '';  // Initialize message as an empty string

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          if (value.length > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          } else {
            this.message = 'There were no trips retrieved from the database';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
