import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';

export const appRoutes: Routes = [
  { path: '', component: TripListingComponent},
  { path: 'add-trip', component: AddTripComponent},
  { path: '**', redirectTo: '' }
];
