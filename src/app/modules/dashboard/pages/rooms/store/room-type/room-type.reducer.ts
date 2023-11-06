import { createReducer, on } from '@ngrx/store';
import { RoomType } from './room-type';
import {
  roomTypeFetchAPISuccess,
  saveRoomTypeAPISuccess,
} from './room-type.action';

export const initialState: ReadonlyArray<RoomType> = [];

export const RoomTypeReducer = createReducer(
  initialState,

  on(roomTypeFetchAPISuccess, (state, { allRoomTypes }) => {
    return allRoomTypes;
  }),

  on(saveRoomTypeAPISuccess, (state, { newRoomType }) => {
    let newState = [...state];
    newState.unshift(newRoomType);
    return newState;
  })
);
