import { createAction, props } from '@ngrx/store';
import { Cargo } from './cargo';

//  CREATE
export const invokeSaveNewCargoAPI = createAction(
  '[Cargo API] Invoke save new Cargo  api',
  props<{ newCargo: any }>()
);

export const saveCargoAPISuccess = createAction(
  '[Cargo API] save new Cargo API Success',
  props<{ newCargo: any }>()
);

//  READ
export const invokeCargoAPI = createAction(
  '[Cargo API] Invoke Fetch Cargo API'
);

export const cargoFetchAPISuccess = createAction(
  '[Cargo API] Fetch Cargo API Success',
  props<{ allCargos: Cargo[] }>()
);
