import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RSVP } from '../rsvp.model';
import { RSVPService } from '../rsvp.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rsvp-form',
  templateUrl: './rsvp-form.component.html',
  styleUrls: ['./rsvp-form.component.css']
})
export class RSVPFormComponent implements OnInit {
  rsvpForm!: FormGroup;
  partyId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private rsvpService: RSVPService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.partyId = +this.route.snapshot.paramMap.get('partyId')!;
    this.rsvpForm = this.formBuilder.group({
      partyId:  this.partyId,
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      attendance: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.rsvpForm.invalid) {
      return;
    }

    const formData: RSVP = this.rsvpForm.value;
    this.rsvpService.addRSVP(formData).subscribe(
      () => {
        this.router.navigate(['rsvp',this.partyId,'thank-you',formData.name]);
      },
      (error) => {
        console.error('Error saving RSVP data:', error);
      }
    );
  }
}
