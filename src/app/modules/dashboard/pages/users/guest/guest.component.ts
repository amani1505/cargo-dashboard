import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestTableComponent } from '../../../components/users/guest/guest-table/guest-table.component';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [CommonModule,GuestTableComponent],
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent {

}
