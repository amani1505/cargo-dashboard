import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './store/user.effect';
import { userReducer } from './store/user.reducer';
import { InstituteModule } from '../institute/institute.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    InstituteModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffect]),
  ],
})
export class UserModule {}
