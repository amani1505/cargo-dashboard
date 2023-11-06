import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomTableComponent } from '../../../components/rooms/room/room-table/room-table.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule,RoomTableComponent],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {

}
