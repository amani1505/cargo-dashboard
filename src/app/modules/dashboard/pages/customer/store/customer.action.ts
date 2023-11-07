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
