import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { productCategoryReducer } from './store/product-category.reducer';
import { ProductCategoryEffect } from './store/product-category.effect';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    StoreModule.forFeature('categories', productCategoryReducer),
    EffectsModule.forFeature([ProductCategoryEffect]),
    HttpClientModule,
  ],
})
export class ProductCategoryModule {}
