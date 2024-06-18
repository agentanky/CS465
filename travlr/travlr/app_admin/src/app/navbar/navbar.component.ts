import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand" href="#"><img src="/assets/images/logo.png" alt="Logo"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" routerLink="listtrips">Trips <span class="sr-only">(current)</span></a>
        </div>
      </div>
      <div class="navbar-end">
        <a class="navbar-item" routerLink="login" *ngIf="!isLoggedIn()">
          <span class="has-icon-left">Log In</span>
        </a>
        <a class="navbar-item" (click)="onLogout()" *ngIf="isLoggedIn()">
          <span class="has-icon-left">Log Out</span>
        </a>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void { }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public onLogout(): void {
    this.authenticationService.logout();
  }
}
