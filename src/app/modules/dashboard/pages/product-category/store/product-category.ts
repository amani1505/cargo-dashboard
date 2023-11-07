import { Cargo } from '../../cargo/store/cargo';
import { Customer } from '../../customer/store/customer';
import { Products } from '../../products/store/products';

export interface ProductCategory {
  id: string;
  name: string;
  wateja: Array<Customer>;
  mizigo: Array<Cargo>;
  products: Array<Products>;
}
