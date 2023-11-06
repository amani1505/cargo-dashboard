import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomTypeTableComponent } from '../../../components/rooms/room-type/room-type-table/room-type-table.component';

@Component({
  selector: 'app-room-type',
  standalone: true,
  imports: [CommonModule,RoomTypeTableComponent],
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent {

}
