import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryTableComponent } from '../../components/product-category/product-category-table/product-category-table.component';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule,ProductCategoryTableComponent],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent {

}
