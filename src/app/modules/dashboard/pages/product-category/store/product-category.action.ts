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

// UPDATE
export const invokeUpdateProductCategoryAPI = createAction(
  '[Product Category API] Inovke update Product Category api',
  props<{ updateProductCategory: any }>()
);

export const updateProductCategoryAPISucess = createAction(
  '[Product Category API] update  Product Category success',
  props<{ updateProductCategory: any }>()
);

// DELETE
export const invokeDeleteProductCategoryAPI = createAction(
  '[Product Category API] Inovke delete Product Category api',
  props<{ id: string }>()
);

export const deleteProductCategoryAPISuccess = createAction(
  '[Product Category API] deleted Product Category api success',
  props<{ id: string }>()
);
