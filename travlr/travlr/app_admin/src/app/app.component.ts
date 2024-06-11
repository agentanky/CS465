import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TripListingComponent],
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ title }}</a>
      </div>
    </nav>
    <div class="container">
   <!-- <app-trip-listing></app-trip-listing>  -->
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Travlr Getaways Admin';
}

