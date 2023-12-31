import { Institute } from '../../institute/store/institute';
import { ProductCategory } from '../../product-category/store/product-category';

export interface Products {
  id: string;
  name: string;
  category: ProductCategory;
  institute: Institute;
}
