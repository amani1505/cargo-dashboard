import { createReducer, on } from '@ngrx/store';
import { Cargo } from './cargo';
import { cargoFetchAPISuccess, saveCargoAPISuccess } from './cargo.action';

export const cargoInitialState: ReadonlyArray<Cargo> = [];

export const cargoReducer = createReducer(
  cargoInitialState,
  on(cargoFetchAPISuccess, (state, { allCargos }) => {
    return allCargos;
  }),
  on(saveCargoAPISuccess, (state, { newCargo }) => {
    let newState = [...state];
    newState.unshift(newCargo);
    return newState;
  })
);
