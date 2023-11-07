import { createAction, props } from '@ngrx/store';
import { ProductCategory } from './product-category';

//  CREATE
export const invokeSaveNewProductCategoryAPI = createAction(
  '[Product Category API] Invoke save new Product Category  api',
  props<{ newProductCategory: any }>()
);

export const saveProductCategoryAPISuccess = createAction(
  '[Product Category API] save new Product Category API Success',
  props<{ newProductCategory: any }>()
);

//  READ
export const invokeProductCategoryAPI = createAction(
  '[Product Category API] Invoke Fetch Product Category API'
);

export const productCategoryFetchAPISuccess = createAction(
  '[Product Category API] Fetch Product Category API Success',
  props<{ allProductCategories: ProductCategory[] }>()
);
