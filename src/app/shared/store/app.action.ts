import { createAction, props } from '@ngrx/store';
import { AppState } from './app-state';

export const setAPIStatus = createAction(
  '[API sucess or Failure status',
  props<{ apiStatus: AppState }>()
);
