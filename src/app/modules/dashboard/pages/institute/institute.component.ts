import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituteTableComponent } from '../../components/institute/institute-table/institute-table.component';

@Component({
  selector: 'app-institute',
  standalone: true,
  imports: [CommonModule,InstituteTableComponent],
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent {

}
