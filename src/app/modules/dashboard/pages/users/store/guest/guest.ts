import { Booking } from "../../../lodges/store/lodge/lodge";

export interface Guest {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    username: string;
    password: string;
    mobile_number: string;
    address: string;
    city: string;
    nationality: string;
    bookings: Array<Booking>;
  }
  