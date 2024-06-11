import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="card">
    <div class="card-header">{{ trip.name }}</div>
    <img [src]="trip.image" alt="trip thumbnail" class="card-img-top">
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">{{ trip.resort }}</h6>
      <p class="card-subtitle mt-3 mb-3 text-muted">{{ trip.length }} only {{ trip.perPerson | currency:'USD':'symbol' }} per person</p>
      <p class="card-text" [innerHTML]="trip.description"></p>
      <div>
        <button (click)="editTrip(trip)" class="btn btn-info">Edit Trip</button>
      </div>
    </div>
  </div>
  `,
  styles: []
})
export class TripCardComponent implements OnInit {
  @Input() trip: any;

  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode')
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip', trip.code]);
  }
}
