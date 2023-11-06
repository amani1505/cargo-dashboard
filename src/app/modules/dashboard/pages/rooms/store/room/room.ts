import { Lodge } from '../../../lodges/store/lodge/lodge';
import { RoomType } from '../room-type/room-type';

export interface Room {
  id: string;
  room_number: number;
  room_type: RoomType;
  lodge: Lodge;
}
