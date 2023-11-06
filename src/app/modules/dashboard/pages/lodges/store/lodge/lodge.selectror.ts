import { createFeatureSelector } from '@ngrx/store';
import { Lodge } from './lodge';

export const selectLodges = createFeatureSelector<Lodge[]>('lodges');
