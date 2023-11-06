import { createFeatureSelector } from "@ngrx/store";
import { Employee } from "./employee";

export const selectEmployees = createFeatureSelector<Employee[]>("employees")