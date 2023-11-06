import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lodges',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lodges.component.html',
  styleUrls: ['./lodges.component.scss'],
})
export class LodgesComponent {}
