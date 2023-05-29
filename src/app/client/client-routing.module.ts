import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { ViewProfileComponent } from '../view-profile/view-profile.component';

import { OrderService } from '../service/order.service';
import { OrdersComponent } from './orders/orders.component';



const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ViewProfileComponent },

      { path: 'orders', component: OrdersComponent },
      

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
  constructor() {
    console.log('client loded');
  }
}
