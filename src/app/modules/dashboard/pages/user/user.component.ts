import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from '../../components/user/user-table/user-table.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,UserTableComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

}
