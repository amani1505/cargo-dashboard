import { Customer } from '../../customer/store/customer';
import { Institute } from '../../institute/store/institute';
import { ProductCategory } from '../../product-category/store/product-category';

export interface Cargo {
  id: string;
  cargo_no: string;
  uzito: number;
  image: string;
  tarehe_kuingia: string;
  tarehe_ya_kutoka: string;
  status: string;
  mteja: Customer;
  category: ProductCategory;
  institute: Institute;
}
