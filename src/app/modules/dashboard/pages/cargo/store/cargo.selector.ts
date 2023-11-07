import { createFeatureSelector } from '@ngrx/store';
import { Cargo } from './cargo';

export const selectCargos = createFeatureSelector<Cargo[]>('cargos');
