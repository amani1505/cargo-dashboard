import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Cargo } from './cargo';

export const selectCargos = createFeatureSelector<Cargo[]>('cargos');

export const selectCargoById = (cargoById: string) =>
  createSelector(selectCargos, (cargo: Cargo[]) => {
    var cargoId = cargo.filter((_) => _.id == cargoById);
    if (cargoId.length == 0) {
      return null;
    }
    return cargoId[0];
  });
