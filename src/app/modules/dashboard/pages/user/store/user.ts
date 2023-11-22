import { Institute } from '../../institute/store/institute';

export interface User {
  id: string;
  full_name: string;
  email: string;
  mobile_number: string;
  role: string;
  password: string;
  institute: Institute;
}
