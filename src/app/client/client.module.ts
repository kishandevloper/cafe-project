import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { IndexComponent } from './index/index.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { HomeComponent } from './home/home.component';

import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SignaturePadModule } from 'angular2-signaturepad';
import { NgxUiLoaderConfig, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';

import { SignatureModelComponent } from '../signature-model/signature-model.component';
import { MatDialogModule } from '@angular/material/dialog';
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

@NgModule({
  declarations: [IndexComponent, HomeComponent, OrdersComponent , SignatureModelComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatChipsModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    SignaturePadModule ,
    MatDialogModule
  ],
})
export class ClientModule {}
