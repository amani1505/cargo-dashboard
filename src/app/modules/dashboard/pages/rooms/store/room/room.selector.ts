import { createFeatureSelector } from "@ngrx/store";
import { Room } from "./room";

export const selectRooms = createFeatureSelector<Room[]>('rooms');