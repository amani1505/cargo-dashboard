import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ProductCategory } from '../../../pages/product-category/store/product-category';


@Component({
  selector: '[product-category-table-item]',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './product-category-table-item.component.html',
  styleUrls: ['./product-category-table-item.component.scss'],
})
export class ProductCategoryTableItemComponent {
  @Input() productCategory = <ProductCategory>{};

  constructor() {}
}
