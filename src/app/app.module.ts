import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './component/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageItemComponent } from './manage-item/manage-item.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FiltercategoryPipe } from './pipes/filtercategory.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AddItemModelComponent } from './add-item-model/add-item-model.component';
import { MatButtonModule } from '@angular/material/button';
import { ShowbillModelComponent } from './showbill.model/showbill.model.component';


import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from 'ngx-ui-loader';
import { LoginComponent } from './component/login/login.component';
import { SignUpModelComponent } from './sign-up-model/sign-up-model.component';
import { TokenInterceptorInterceptor } from './service/token-interceptor.interceptor';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { CPasswordComponent } from './c-password/c-password.component';
import { MatDividerModule } from '@angular/material/divider';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  // bgsColor: "red",
  // bgsPosition: POSITION.bottomCenter,
  // bgsSize: 40,
  // bgsType: SPINNER.threeStrings, // background spinner type
  // fgsType: SPINNER.threeStrings, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  fgsType: SPINNER.doubleBounce, // foreground spinner type
  //  fgsColor:'red' ,
  fgsPosition: 'center-center',
  fgsSize: 70,
};

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ManageCategoryComponent,
    ManageItemComponent,
    ManageOrderComponent,
    ViewBillComponent,
    FiltercategoryPipe,
    AddItemModelComponent,
    ShowbillModelComponent,
    LoginComponent,
    SignUpModelComponent,
    ViewProfileComponent,
    CPasswordComponent,
    AllOrdersComponent,
    ManageEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
