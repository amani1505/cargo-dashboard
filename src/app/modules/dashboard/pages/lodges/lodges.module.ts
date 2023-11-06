import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodgesRoutingModule } from './lodges-routing.module';
import { StoreModule } from '@ngrx/store';
import { lodgeReducer } from './store/lodge/lodge.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LodgeEffect } from './store/lodge/lodge.effect';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LodgesRoutingModule,
    StoreModule.forFeature('lodges', lodgeReducer),
    EffectsModule.forFeature([LodgeEffect]),
    HttpClientModule
  
  ],
})
export class LodgesModule {}
