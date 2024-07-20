export interface Party {
  id: number;
  name: string;
  date: string;
  location: string;
}

export interface RSVP {
  partyId: number;
  name: string;
  email: string;
  phone: string;
  attendance: string;
}

