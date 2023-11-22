import { Cargo } from '../../cargo/store/cargo';
import { Institute } from '../../institute/store/institute';
import { ProductCategory } from '../../product-category/store/product-category';

export interface Customer {
  id: string;
  jina_la_mteja: string;
  location_ya_mteja: string;
  namba_ya_simu: string;
  category: ProductCategory;
  mizigo: Array<Cargo>;
  institute:Institute
}
