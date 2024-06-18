import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
  <div class="container" *ngIf="!isLoggedIn()">Please login to
  continue</div>
  `,
  styles: ``
})
export class HomeComponent {

}
