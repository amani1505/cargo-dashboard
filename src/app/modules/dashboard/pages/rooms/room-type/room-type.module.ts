import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RoomTypeReducer } from '../store/room-type/room-type.reducer';
import { RoomTypeEffect } from '../store/room-type/room-type.effect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('room-types', RoomTypeReducer),
    EffectsModule.forFeature([RoomTypeEffect]),
  ],
})
export class RoomTypeModule {}
