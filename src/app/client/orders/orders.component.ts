import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Array<any> = [];
  userid: string;
  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.userid = user.id;
    this.fetchorders();
  }
  constructor(
    private orderser: OrderService,
    private ngxloader: NgxUiLoaderService
  ) {}
  fetchorders() {
    this.ngxloader.start();
    this.orderser.fetchorders(this.userid).subscribe((res: any) => {
      this.orders = res;
      this.ngxloader.stop();
    });
  }
}
