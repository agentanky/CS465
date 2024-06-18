import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],  // Add FormsModule to imports array
  template: `
    <div class="row">
      <div class="col-12 col-md-8">
        <h2>Login</h2>
        <form (ngSubmit)="onLoginSubmit()">
          <div role="alert" *ngIf="formError" class="alert alert-danger">{{ formError }}</div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Enter email address" [(ngModel)]="credentials.email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" name="password" placeholder="e.g 12+ alphanumerics" [(ngModel)]="credentials.password" required>
          </div>
          <button type="submit" role="button" class="btn btn-primary">Sign In!</button>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void { }

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    this.authenticationService.login(this.credentials)
      .then(() => this.router.navigateByUrl('#'))
      .catch((message) => this.formError = message);
  }
}
