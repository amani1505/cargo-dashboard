import { createReducer, on } from '@ngrx/store';
import { Cargo } from './cargo';
import {
  cargoFetchAPISuccess,
  deleteCargoAPISuccess,
  saveCargoAPISuccess,
  updateCargoAPISucess,
} from './cargo.action';

export const cargoInitialState: ReadonlyArray<Cargo> = [];

export const cargoReducer = createReducer(
  cargoInitialState,
  on(saveCargoAPISuccess, (state, { newCargo }) => {
    let newState = [...state];
    newState.unshift(newCargo);
    return newState;
  }),
  on(cargoFetchAPISuccess, (state, { allCargos }) => {
    return allCargos;
  }),
  on(updateCargoAPISucess, (state, { updateCargo }) => {
    let newState = state.filter((_) => _.id != updateCargo.id);
    newState.unshift(updateCargo);
    return newState;
  }),
  on(deleteCargoAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id != id);

    return newState;
  })
);
