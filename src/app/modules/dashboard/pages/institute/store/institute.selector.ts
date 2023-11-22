import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Institute } from './institute';

export const selectInstitutes =
  createFeatureSelector<Institute[]>('institutes');

export const selectInstituteById = (instituteById: string) =>
  createSelector(selectInstitutes, (institute: Institute[]) => {
    var instituteId = institute.filter((_) => _.id == instituteById);
    if (instituteId.length == 0) {
      return null;
    }
    return instituteId[0];
  });
