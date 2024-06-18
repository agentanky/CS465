import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  { path: '', component: TripListingComponent},
  { path: 'add-trip', component: AddTripComponent},
  { path: 'edit-trip/:tripCode', component: EditTripComponent},
  { path: 'login', component: LoginComponent},
  { path: 'list-trips', component: TripListingComponent},
  { path: '', component: HomeComponent, pathMatch: 'full'}

];
