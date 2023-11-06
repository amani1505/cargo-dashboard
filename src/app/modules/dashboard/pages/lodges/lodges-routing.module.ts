import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LodgeComponent } from './lodge/lodge.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  {path:"",component:LodgeComponent},
  {path:"services",component:ServicesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LodgesRoutingModule { }
