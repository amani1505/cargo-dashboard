import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LodgesComponent } from '../dashboard/pages/lodges/lodges.component';
import { UsersComponent } from '../dashboard/pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'lodges',
        component: LodgesComponent,
        loadChildren: () =>
          import('../dashboard/pages/lodges/lodges.module').then(
            (m) => m.LodgesModule
          ),
      },
      {
        path: 'rooms',
        component: LodgesComponent,
        loadChildren: () =>
          import('../dashboard/pages/rooms/rooms.module').then(
            (m) => m.RoomsModule
          ),
      },
      {
        path:"users",
        component:UsersComponent,
        loadChildren:()=> import("../dashboard/pages/users/users.module").then((m)=>m.UsersModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
