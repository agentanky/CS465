import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="col-md-4">
      <h2 class="text-center">Add Trip</h2>
      <form *ngIf="addForm" [formGroup]="addForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Code:</label>
          <input type="text" formControlName="code" placeholder="Code" class="form-control" [ngClass]="{ 'is-invalid': submitted && f['code'].errors }">
          <div *ngIf="submitted && f['code'].errors">
            <div *ngIf="f['code'].errors?.['required']">Trip Code is required</div>
          </div>
        </div>

        <div class="form-group">
          <label>Name:</label>
          <input type="text" formControlName="name" placeholder="Name" class="form-control" [ngClass]="{ 'is-invalid': submitted && f['name'].errors }">
          <div *ngIf="submitted && f['name'].errors">
            <div *ngIf="f['name'].errors?.['required']">Name is required</div>
          </div>
        </div>

        <div class="form-group">
          <label>Length:</label>
          <input type="text" formControlName="length" placeholder="Length" class="form-control" [ngClass]="{ 'is-invalid': submitted && f['length'].errors }">
          <div *ngIf="submitted && f['length'].errors">
            <div *ngIf="f['length'].errors?.['required']">Length is required</div>
          </div>
        </div>

        <div class="form-group">
          <label>Start:</label>
          <input type="date" formControlName="start" placeholder="Start" class="form-control" [ngClass]="{ 'is-invalid': submitted && f['start'].errors }">
          <div *ngIf="submitted && f['start'].errors">
            <div *ngIf="f['start'].errors?.['required']">Date is required</div>
          </div>
        </div>

        <div class="form-group">
          <label>Resort:</label>
          <input type="text" formControlName="resort" placeholder="Resort" class="form-control" [ngClass]="{ 'is-invalid': submitted && f['resort'].errors }">
          <div *ngIf="submitted && f['resort'].errors">
            <div *ngIf="f['resort'].errors?.['required']">Resort is required</div>
          </div>
        </div>

        <div class="form-group">
          <label>Per Person:</label>
          <input type="text" formControlName="perPerson" placeholder="Per Person" class="form-control" [ngClass]="{ 'is-invalid': submitted && f['perPerson'].errors }">
          <div *ngIf="submitted && f['perPerson'].errors">
            <div *ngIf="f['perPerson'].errors?.['required']">Per Person is required</div>
          </div>
        </div>

        <div class="form-group">
          <label>Image Name:</label>
          <input type="text" formControlName="image" placeholder="Image" class="form-control" [ngClass]="{ 'is-invalid': submitted && f['image'].errors }">
          <div *ngIf="submitted && f['image'].errors">
            <div *ngIf="f['image'].errors?.['required']">Image Name is required</div>
          </div>
        </div>

        <div class="form-group">
          <label>Description:</label>
          <input type="text" formControlName="description" placeholder="Description" class="form-control" [ngClass]="{ 'is-invalid': submitted && f['description'].errors }">
          <div *ngIf="submitted && f['description'].errors">
            <div *ngIf="f['description'].errors?.['required']">Description is required</div>
          </div>
        </div>

        <button type="submit" class="btn btn-info">Save</button>
      </form>
    </div>
  `,
  styles: []
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }

  get f() { return this.addForm.controls; }
}
