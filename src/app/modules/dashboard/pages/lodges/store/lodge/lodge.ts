import { Room } from '../../../rooms/store/room/room';
import { Employee } from '../../../users/store/employee/employee';
import { Guest } from '../../../users/store/guest/guest';


export interface Lodge {
  id: string;
  city: string;
  address: string;
  description: string;
  images: string;
  rooms?: Array<Room>;
  employee?: Array<Employee>;
  bookings?: Array<Booking>;
}


export interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  total_payment: string;
  guest: Array<Guest>;
  lodge: Lodge;
}


