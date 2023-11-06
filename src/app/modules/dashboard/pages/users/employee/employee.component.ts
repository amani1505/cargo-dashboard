import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTableComponent } from '../../../components/users/employee/employee-table/employee-table.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,EmployeeTableComponent],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

}
