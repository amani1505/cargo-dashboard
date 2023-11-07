import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CustomerComponent } from '../dashboard/pages/customer/customer.component';
import { ProductsComponent } from '../dashboard/pages/products/products.component';
import { ProductCategoryComponent } from '../dashboard/pages/product-category/product-category.component';
import { CargoComponent } from '../dashboard/pages/cargo/cargo.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'customers',
        component: CustomerComponent,
        loadChildren: () =>
          import('../dashboard/pages/customer/customer.module').then(
            (m) => m.CustomerModule
          ),
      },
      {
        path: 'products',
        component: ProductsComponent,
        loadChildren: () =>
          import('../dashboard/pages/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'product-category',
        component: ProductCategoryComponent,
        loadChildren: () =>
          import(
            '../dashboard/pages/product-category/product-category.module'
          ).then((m) => m.ProductCategoryModule),
      },
      {
        path: 'cargo',
        component: CargoComponent,
        loadChildren: () =>
          import('../dashboard/pages/cargo/cargo.module').then(
            (m) => m.CargoModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
