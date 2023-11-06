import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { guestReducer } from '../store/guest/guest.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GuestEffect } from '../store/guest/guest.effect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('guests', guestReducer),
    EffectsModule.forFeature([GuestEffect]),
  ],
})
export class GuestModule {}
