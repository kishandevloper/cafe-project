import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DashboardService } from '../service/dashboard.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  categorys: number = 0;
  bills: number = 0;
  item: number = 0;
  ngOnInit(): void {
    this.count();
  }
  constructor(
    private dashboardservice: DashboardService,
    private router: Router , private ngxService: NgxUiLoaderService
  ) {}
  count() {
    this.ngxService.start();
    this.dashboardservice.countall().subscribe((res: any) => {

      this.categorys = res.categorys;
      this.bills = res.bills;
      this.item = res.items;
    });
    this.ngxService.stop();
  }

  gotocategory() {
    this.router.navigate(['/home', 'managecategory']);
  }
}
