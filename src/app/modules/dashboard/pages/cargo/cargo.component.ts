import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargoTableComponent } from '../../components/cargo/cargo-table/cargo-table.component';

@Component({
  selector: 'app-cargo',
  standalone: true,
  imports: [CommonModule, CargoTableComponent],
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss'],
})
export class CargoComponent {}
