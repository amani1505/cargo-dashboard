import { createFeatureSelector } from '@ngrx/store';
import { Guest } from './guest';

export const selectGuests = createFeatureSelector<Guest[]>('guests');
