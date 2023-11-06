import { Lodge } from '../../../lodges/store/lodge/lodge';

export enum UserRole {
  ADMIN = 'admin',
  RECEPTIONIST = 'receptionist',
}
export interface Employee {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  username: string;
  password: string;
  role: UserRole;
  mobile_number: string;
  address: string;
  city: string;
  nationality: string;
  lodge: Lodge;
}
