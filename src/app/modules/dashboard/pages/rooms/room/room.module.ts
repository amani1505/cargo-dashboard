import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RoomReducer } from '../store/room/room.reducer';
import { RoomEffect } from '../store/room/room.effect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('rooms', RoomReducer),
    EffectsModule.forFeature([RoomEffect]),
  ],
})
export class RoomModule {}
