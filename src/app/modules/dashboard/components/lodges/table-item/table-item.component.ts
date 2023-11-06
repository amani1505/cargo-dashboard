import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Nft } from '../../../models/nft';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Store, select } from '@ngrx/store';
import { selectLodges } from '../../../pages/lodges/store/lodge/lodge.selectror';
import { Lodge } from '../../../pages/lodges/store/lodge/lodge';
import { environment } from 'src/environments/environment';

@Component({
  selector: '[lodge-table-item]',
  standalone: true,
  imports: [CommonModule,AngularSvgIconModule, CurrencyPipe],
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss']
  
})
export class TableItemComponent {
  @Input() lodge = <Lodge>{};
  apiUrl = environment.apiUrl

  constructor() {}



}
