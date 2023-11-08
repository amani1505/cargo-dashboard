import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerTableComponent } from '../../components/customer/customer-table/customer-table.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule,CustomerTableComponent],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

}
