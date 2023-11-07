import { createFeatureSelector } from '@ngrx/store';
import { Products } from './products';

export const selectProducts = createFeatureSelector<Products[]>('products');
