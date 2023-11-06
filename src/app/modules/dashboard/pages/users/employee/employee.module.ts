import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from '../store/employee/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffect } from '../store/employee/employee.effect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('employees', employeeReducer),
    EffectsModule.forFeature([EmployeeEffect]),
  ],
})
export class EmployeeModule {}
