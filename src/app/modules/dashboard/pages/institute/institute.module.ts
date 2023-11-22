import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstituteRoutingModule } from './institute-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomerEffect } from '../customer/store/customer.effect';
import { customerReducer } from '../customer/store/customer.reducer';
import { InstituteEffect } from './store/institute.effect';
import { InstituteReducer } from './store/institute.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InstituteRoutingModule,
    StoreModule.forFeature('institutes', InstituteReducer),
    EffectsModule.forFeature([InstituteEffect]),
  ],
})
export class InstituteModule {}
