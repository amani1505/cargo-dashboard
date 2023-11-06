import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { RoomTypeComponent } from './room-type/room-type.component';

const routes: Routes = [
  { path: '', component: RoomComponent },
  { path: 'room-type', component: RoomTypeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
