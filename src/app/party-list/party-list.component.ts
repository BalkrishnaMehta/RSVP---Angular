import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Party } from '../rsvp.model';
import { RSVPService } from '../rsvp.service';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {
  gridCols!: number;
  upcomingParties: Party[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private rsvpService: RSVPService) {
    this.gridCols = 4;
    this.breakpointObserver.observe([
      Breakpoints.XSmall,   
      Breakpoints.Small,    
      Breakpoints.Medium,   
      Breakpoints.Large,     
      Breakpoints.XLarge,    
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.gridCols = 1; 
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.gridCols = 2;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.gridCols = 3; 
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.gridCols = 4; 
      } else{
        this.gridCols = 1; 
      }
    });
  }


  ngOnInit() {
    this.rsvpService.getparties().subscribe(
      (parties) => {
        this.upcomingParties = parties;
      },
      (error) => {
        console.error('Error fetching RSVP data:', error);
      }
    );
  }
  
  addParty() {
    const partyName = window.prompt('Enter party name:');
    if (!partyName) return; 

    const partyLocation = window.prompt('Enter party L:ocation:');
    if (!partyLocation) return; 
    
    let partyDate: string | null = null;
    while (partyDate === null || !this.isValidDate(partyDate)) {
      partyDate = window.prompt('Enter a valid upcoming date (YYYY-MM-DD) for party:');
      if (partyDate === null) return; 
    }

    const newParty: Party = {
      id: this.upcomingParties.length + 1,
      name: partyName,
      date: partyDate,
      location: partyLocation,
    };

    this.rsvpService.addparties(newParty).subscribe(
      () => {
        window.alert('Party event added!!!'); 
        window.location.reload(); 
      },
      (error) => {
        console.error('Error saving RSVP data:', error);
      }
    );
  }

  isValidDate(dateStr: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateStr)) return false;

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return false; 

    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    if (date.getTime() <= today.getTime()) return false;

    return true;
  }

}

