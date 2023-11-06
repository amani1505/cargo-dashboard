import { Lodge } from './lodge';
import { createReducer, on } from '@ngrx/store';
import { lodgesFetchAPISuccess, saveLodgeAPISuccess } from './lodge.action';

export const initialState: ReadonlyArray<Lodge> = [];

export const lodgeReducer = createReducer(
  initialState,
  on(lodgesFetchAPISuccess, (state, { allLodges }) => {
    return allLodges;
  }),
  on(saveLodgeAPISuccess, (state, { newLodge }) => {
    let newState = [...state];
    newState.unshift(newLodge);
    return newState;
  })
);
