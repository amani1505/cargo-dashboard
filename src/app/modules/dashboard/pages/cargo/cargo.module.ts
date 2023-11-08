import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargoRoutingModule } from './cargo-routing.module';
import { cargoReducer } from './store/cargo.reducer';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CargoEffect } from './store/cargo.effect';
import { CustomerModule } from '../customer/customer.module';
import { ProductCategoryModule } from '../product-category/product-category.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CargoRoutingModule,
    StoreModule.forFeature('cargos', cargoReducer),
    EffectsModule.forFeature([CargoEffect]),
    HttpClientModule,
    CustomerModule,
    ProductCategoryModule,
  ],
})
export class CargoModule {}
