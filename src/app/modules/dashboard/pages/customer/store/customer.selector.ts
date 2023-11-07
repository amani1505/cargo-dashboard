import { createFeatureSelector } from "@ngrx/store";
import { Customer } from "./customer";

export const selectCustomers = createFeatureSelector<Customer[]>('customers');
