import { Component, OnInit } from '@angular/core';
import { RSVP } from '../rsvp.model';
import { RSVPService } from '../rsvp.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {
  guests: RSVP[] = [];
  partyId!: number;

  constructor(
    private rsvpService: RSVPService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.partyId = +this.route.snapshot.paramMap.get('partyId')!;
    this.rsvpService.getRSVPs().subscribe(
      (rsvps) => {
        this.guests = rsvps.filter(rsvp => rsvp.attendance === "Yes, I'll be there" && rsvp.partyId === this.partyId);
      },
      (error) => {
        console.error('Error fetching RSVP data:', error);
      }
    );
  }
}
