import { createReducer, on } from '@ngrx/store';
import { Guest } from './guest';
import { guestFetchAPISuccess } from './guest.action';

export const initialState: ReadonlyArray<Guest> = [];

export const guestReducer = createReducer(
  initialState,
  on(guestFetchAPISuccess, (state, { allGuests }) => {
    return allGuests;
  })
);
