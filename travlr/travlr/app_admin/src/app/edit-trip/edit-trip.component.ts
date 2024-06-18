import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="col-md-4">
      <h2 class="text-center">Edit Trip</h2>
      <form *ngIf="editForm" [formGroup]="editForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Code:</label>
          <input type="text" formControlName="code" placeholder="Code" class="form-control">
        </div>

        <div class="form-group">
          <label>Name:</label>
          <input type="text" formControlName="name" placeholder="Name" class="form-control">
        </div>

        <div class="form-group">
          <label>Length:</label>
          <input type="text" formControlName="length" placeholder="Length" class="form-control">
        </div>

        <div class="form-group">
          <label>Start:</label>
          <input type="date" formControlName="start" placeholder="Start" class="form-control">
        </div>

        <div class="form-group">
          <label>Resort:</label>
          <input type="text" formControlName="resort" placeholder="Resort" class="form-control">
        </div>

        <div class="form-group">
          <label>Per Person:</label>
          <input type="text" formControlName="perPerson" placeholder="Per Person" class="form-control">
        </div>

        <div class="form-group">
          <label>Image Name:</label>
          <input type="text" formControlName="image" placeholder="Image" class="form-control">
        </div>

        <div class="form-group">
          <label>Description:</label>
          <input type="text" formControlName="description" placeholder="Description" class="form-control">
        </div>

        <button type="submit" class="btn btn-info">Save</button>
      </form>
    </div>
  `,
  styles: []
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tripDataService: TripDataService
  ) {}

  ngOnInit() {
    const tripCode = this.route.snapshot.paramMap.get('tripCode');
    this.editForm = this.formBuilder.group({
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

    if (tripCode) {
      this.tripDataService.getTrip(tripCode).subscribe(trip => {
        if (Array.isArray(trip) && trip.length > 0) {
          this.editForm.patchValue(trip[0]);
        }


      });
    }
  }

  public onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
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

  get f() { return this.editForm.controls; }
}