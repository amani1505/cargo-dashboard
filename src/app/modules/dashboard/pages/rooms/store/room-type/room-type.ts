import { Room } from "../room/room";

export interface RoomType {
    id: string;
    capacity: number;
    type: string;
    // address: string;
    rooms: Array<Room>;
    room_price: string;
    description: string;
    images: string;
  }