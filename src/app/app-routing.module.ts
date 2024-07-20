import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartyListComponent } from './party-list/party-list.component';
import { RSVPFormComponent } from './rsvp-form/rsvp-form.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { GuestListComponent } from './guest-list/guest-list.component';

const routes: Routes = [
  { path: '', component: PartyListComponent },
  { path: 'rsvp/:partyId', component: RSVPFormComponent },
  { path: 'rsvp/:partyId/thank-you/:name', component: ThankYouComponent },
  { path: 'rsvp/:partyId/guest-list', component: GuestListComponent },
  { path: '**', component: PartyListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
