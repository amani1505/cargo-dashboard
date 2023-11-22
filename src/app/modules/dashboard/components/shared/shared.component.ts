import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { selectCargos } from '../../pages/cargo/store/cargo.selector';
import { selectProducts } from '../../pages/products/store/products.selector';
import { selectCustomers } from '../../pages/customer/store/customer.selector';
import { ProductsModule } from '../../pages/products/products.module';
import { CustomerModule } from '../../pages/customer/customer.module';
import { CargoModule } from '../../pages/cargo/cargo.module';
import { Observable } from 'rxjs';
import { Cargo } from '../../pages/cargo/store/cargo';
import { CargoService } from '../../pages/cargo/cargo.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CustomerService } from '../../pages/customer/customer.service';
import { ProductsService } from '../../pages/products/products.service';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [CommonModule, ProductsModule, AngularSvgIconModule],
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit {
  numberOfCargo: number;
  numberOfCustomer: number;
  numberOfProducts: number;

  constructor(
    private _cargoService: CargoService,
    private _customerService: CustomerService,
    private _productService: ProductsService
  ) {}
  ngOnInit() {
    this._cargoService.numberOfCargo.subscribe((cargo) => {
      this.numberOfCargo = cargo;
    });

    this._customerService.numberOfCustomer.subscribe((customer) => {
      this.numberOfCustomer = customer;
    });

    this._productService.numberOfProduct.subscribe((product) => {
      this.numberOfProducts = product;
    });
    this._productService.getNumberOfProduct();
    this._cargoService.getNumberOfCargo();
    this._customerService.getNumberOfCustomer();
  }
}
