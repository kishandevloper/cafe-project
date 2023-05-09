import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageItemComponent } from './manage-item/manage-item.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { CPasswordComponent } from './c-password/c-password.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'managecategory', component: ManageCategoryComponent },
      { path: 'manageitem', component: ManageItemComponent },
      { path: 'manageorder', component: ManageOrderComponent },
      { path: 'viewbill', component: ViewBillComponent },
      { path: 'viewprofile', component: ViewProfileComponent },
      { path: 'change-password', component: CPasswordComponent },
      { path: 'all-orders', component: AllOrdersComponent },
      { path: 'manage-employee', component: ManageEmployeeComponent },
    ],
  },
  {
    path: 'index',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
