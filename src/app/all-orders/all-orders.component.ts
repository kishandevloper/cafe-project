import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
})
export class AllOrdersComponent implements OnInit {
  allorders: Array<any> = [];
  order: any;

  ngOnInit(): void {
    this.fethorders();
  }

  constructor(private orderser: OrderService) {}
  fethorders() {
    this.orderser.fetchallorders().subscribe((res: any) => {
      this.allorders = res;
    });
  }
}
