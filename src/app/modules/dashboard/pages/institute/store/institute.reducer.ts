import { createReducer, on } from '@ngrx/store';
import { Institute } from './institute';
import {
  InstituteFetchAPISuccess,
  deleteInstituteAPISuccess,
  saveInstituteAPISuccess,
  updateInstituteAPISucess,
} from './institute.action';

export const InstituteInitialState: ReadonlyArray<Institute> = [];

export const InstituteReducer = createReducer(
  InstituteInitialState,
  on(saveInstituteAPISuccess, (state, { newInstitute }) => {
    let newState = [...state];
    newState.unshift(newInstitute);
    return newState;
  }),

  on(InstituteFetchAPISuccess, (state, { allInstitutes }) => {
    return allInstitutes;
  }),

  on(updateInstituteAPISucess, (state, { updateInstitute }) => {
    let newState = state.filter((_) => _.id != updateInstitute.id);
    newState.unshift(updateInstitute);
    return newState;
  }),

  on(deleteInstituteAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id != id);
    return newState;
  })
);
