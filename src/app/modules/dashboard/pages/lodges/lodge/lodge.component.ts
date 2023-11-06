import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../components/lodges/table/table.component';


@Component({
  selector: 'app-lodge',
  standalone: true,
  imports: [CommonModule,TableComponent,],
  templateUrl: './lodge.component.html',
  styleUrls: ['./lodge.component.scss']
})
export class LodgeComponent {

}
