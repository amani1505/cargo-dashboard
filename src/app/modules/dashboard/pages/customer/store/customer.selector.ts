import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Customer } from './customer';

export const selectCustomers = createFeatureSelector<Customer[]>('customers');

export const selectCustomerById = (customerById: string) =>
  createSelector(selectCustomers, (customer: Customer[]) => {
    var customerId = customer.filter((_) => _.id == customerById);
    if (customerId.length == 0) {
      return null;
    }
    return customerId[0];
  });
