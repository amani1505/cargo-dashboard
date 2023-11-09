import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Products } from './products';

export const selectProducts = createFeatureSelector<Products[]>('products');

export const selectProductCategoryById = (productById: string) =>
  createSelector(selectProducts, (product: Products[]) => {
    var productId = product.filter((_) => _.id == productById);
    if (productId.length == 0) {
      return null;
    }
    return productId[0];
  });
