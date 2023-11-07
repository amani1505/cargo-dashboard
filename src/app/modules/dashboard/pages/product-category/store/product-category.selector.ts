import { createFeatureSelector } from '@ngrx/store';
import { ProductCategory } from './product-category';

export const selectProductCategories =
  createFeatureSelector<ProductCategory[]>('categories');
