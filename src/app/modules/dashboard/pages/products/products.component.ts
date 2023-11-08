import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsTableComponent } from '../../components/products/products-table/products-table.component';
import { ProductCategoryModule } from '../product-category/product-category.module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductsTableComponent, ProductCategoryModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {}
