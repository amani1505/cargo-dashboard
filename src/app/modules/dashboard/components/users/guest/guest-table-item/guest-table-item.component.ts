import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { Guest } from 'src/app/modules/dashboard/pages/users/store/guest/guest';

@Component({
  selector: '[guest-table-item]',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, CurrencyPipe],
  templateUrl: './guest-table-item.component.html',
  styleUrls: ['./guest-table-item.component.scss'],
})
export class GuestTableItemComponent {
  @Input() guest = <Guest>{};
  image = 'assets/icons/heroicons/outline/users.svg';
}
