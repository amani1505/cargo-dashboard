import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RoomType } from 'src/app/modules/dashboard/pages/rooms/store/room-type/room-type';
import { environment } from 'src/environments/environment';

@Component({
  selector: '[room-type-table-item]',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, CurrencyPipe],
  templateUrl: './room-type-table-item.component.html',
  styleUrls: ['./room-type-table-item.component.scss'],
})
export class RoomTypeTableItemComponent {
  @Input() roomType = <RoomType>{};
  apiUrl = environment.apiUrl;
}
