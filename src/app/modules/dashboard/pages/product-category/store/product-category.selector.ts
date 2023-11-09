import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductCategory } from './product-category';

export const selectProductCategories =
  createFeatureSelector<ProductCategory[]>('categories');

export const selectProductCategoryById = (productCategoryById: string) =>
  createSelector(
    selectProductCategories,
    (productCategory: ProductCategory[]) => {
      var productCategoryId = productCategory.filter(
        (_) => _.id == productCategoryById
      );
      if (productCategoryId.length == 0) {
        return null;
      }
      return productCategoryId[0];
    }
  );
