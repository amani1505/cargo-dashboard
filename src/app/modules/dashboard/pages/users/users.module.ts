import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { GuestModule } from './guest/guest.module';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UsersRoutingModule, GuestModule, EmployeeModule],
})
export class UsersModule {}
