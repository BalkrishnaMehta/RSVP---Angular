import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  partyId!: number;
  name: string;
  
  constructor(private route: ActivatedRoute) {
    this.name = this.route.snapshot.paramMap.get('name')!;
  }
  ngOnInit(): void {
    this.partyId = +this.route.snapshot.paramMap.get('partyId')!;
  }
}
