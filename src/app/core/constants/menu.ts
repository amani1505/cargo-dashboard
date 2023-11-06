import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      items: [
        /** Customers */
        {
          icon: 'assets/icons/heroicons/outline/user-group.svg',
          label: 'Customers',
          route: '/customers',
        },
        /** Products */
        {
          icon: 'assets/icons/tablericons/building-store.svg',
          label: 'Products',
          route: '/products',
        },
        /** Category */
        {
          icon: 'assets/icons/tablericons/category-2.svg',
          label: 'Product Category',
          route: '/product-category',
        },
        /** Cargo */
        {
          icon: 'assets/icons/tablericons/truck.svg',
          label: 'Cargo',
          route: '/cargo',
        },
      ],
    },
  ];
}
