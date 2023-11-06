import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomTypeModule } from './room-type/room-type.module';
import { RoomModule } from './room/room.module';
import { LodgesModule } from '../lodges/lodges.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, RoomTypeModule, RoomModule, RoomsRoutingModule,LodgesModule],
})
export class RoomsModule {}
