import { createReducer, on } from '@ngrx/store';
import { Room } from './room';
import { roomFetchAPISuccess, saveRoomAPISuccess } from './room.action';

export const initialState: ReadonlyArray<Room> = [];

export const RoomReducer = createReducer(
  initialState,

  on(roomFetchAPISuccess, (state, { allRooms }) => {
    return allRooms;
  }),

  on(saveRoomAPISuccess, (state, { newRoom }) => {
    let newState = [...state];
    newState.unshift(newRoom);
    return newState;
  })
);
