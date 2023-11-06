import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      /** Dashboard */
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
        },
        /** Lodges */
        {
          icon: 'assets/icons/heroicons/outline/building-office-2.svg',
          label: 'Lodges',
          route: '/lodges',
          children: [
            {
              icon: 'assets/icons/heroicons/outline/building-office.svg',
              label: 'Lodge',
              route: '/lodges',
            },
            {
              icon: 'assets/icons/heroicons/outline/chart-pie.svg',
              label: 'Services',
              route: '/lodges/services',
            },
          ],
        },
        /**Rooms */
        {
          icon: 'assets/icons/tablericons/bed.svg',
          label: 'Rooms',
          route: '/rooms',
          children: [
            {
              label: 'Room',
              route: '/rooms',
            },
            {
              label: 'Room Type',
              route: '/rooms/room-type',
            },
          ],
        },
        /**Users */
        {
          icon: 'assets/icons/heroicons/outline/user-group.svg',
          label: 'Users',
          route: '/users',
          children: [
            {
              label: 'Employee',
              route: '/users/employee',
            },
            {
              label: 'Guests',
              route: '/users/guests',
            },
          ],
        },
        /** Utils */
        {
          icon: 'assets/icons/heroicons/outline/rectangle-group.svg',
          label: 'Utils',
          route: '/dashboard',
        },
        /** Bookings */
        {
          icon: 'assets/icons/heroicons/outline/banknotes.svg',
          label: 'Bookings',
          route: '/dashboard',
        },
        /**Gallery */
        {
          icon: 'assets/icons/heroicons/outline/photo.svg',
          label: 'Gallery',
          route: '/dashboard',
        },
      ],
    },
  ];
}
