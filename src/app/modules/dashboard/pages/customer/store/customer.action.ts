import { createAction, props } from '@ngrx/store';
import { Customer } from './customer';

//  CREATE
export const invokeSaveNewCustomerAPI = createAction(
  '[Customer API] Invoke save new Customer  api',
  props<{ newCustomer: any }>()
);

export const saveCustomerAPISuccess = createAction(
  '[Customer API] save new Customer API Success',
  props<{ newCustomer: any }>()
);

//  READ
export const invokeCustomerAPI = createAction(
  '[Customer API] Invoke Fetch Customer API'
);

export const customerFetchAPISuccess = createAction(
  '[Customer API] Fetch Customer API Success',
  props<{ allCustomers: Customer[] }>()
);

// UPDATE
export const invokeUpdateCustomerAPI = createAction(
  '[Customer API] Inovke update Customer api',
  props<{ updateCustomer: any }>()
);

export const updateCustomerAPISucess = createAction(
  '[Customer API] update  Customer success',
  props<{ updateCustomer: any }>()
);

// DELETE
export const invokeDeleteCustomerAPI = createAction(
  '[Customer API] Inovke delete Customer api',
  props<{ id: string }>()
);

export const deleteCustomerAPISuccess = createAction(
  '[Customer API] deleted Customer api success',
  props<{ id: string }>()
);
