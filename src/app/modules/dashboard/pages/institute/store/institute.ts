import { Cargo } from '../../cargo/store/cargo';
import { Customer } from '../../customer/store/customer';
import { ProductCategory } from '../../product-category/store/product-category';
import { Products } from '../../products/store/products';

export interface Institute {
  id: string;
  name: string;
  location: string;
  logo: string;
  // users: User[];
  productCategories: Array<ProductCategory>;
  products: Array<Products>;
  mizigo: Array<Cargo>;
  wateja: Array<Customer>;
}
