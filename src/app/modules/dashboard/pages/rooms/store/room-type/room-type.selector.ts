import { createFeatureSelector } from "@ngrx/store";
import { RoomType } from "./room-type";

export const selectRoomTypes = createFeatureSelector<RoomType[]>('room-types');
