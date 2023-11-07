import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { StoreModule } from '@ngrx/store';

import { CustomerEffect } from './store/customer.effect';
import { EffectsModule } from '@ngrx/effects';
import { customerReducer } from './store/customer.reducer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    StoreModule.forFeature('customers', customerReducer),
    EffectsModule.forFeature([CustomerEffect]),
    HttpClientModule
  ],
})
export class CustomerModule {}
