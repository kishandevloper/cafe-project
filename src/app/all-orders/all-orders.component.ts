import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../service/order.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderModelComponent } from '../order-model/order-model.component';
import { Subject, filter, takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
})
export class AllOrdersComponent implements OnInit {
  // range = new FormGroup({
  //   start: new FormControl<Date | null>(null),
  //   end: new FormControl<Date | null>(null),
  // });

  // allorders: Array<any> = [];
  // order: any;
  // dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject<any>();

  // dtElement: DataTableDirective;

  // isDtInitialized: boolean = false;
  // ngOnInit(): void {
  //   this.fethorders();
  //   this.dtOptions = {
  //     // pagingType: 'full_numbers',
  //     // pagingType: 'simple',
  //     pagingType: 'simple_numbers',
  //     // pagingType: 'full_numbers' ,
  //     // pagingType: 'full',

  //     // searching:false
  //     paging: true,
  //     lengthChange: true,

  //     retrieve: true,
  //     language: {
  //       searchPlaceholder: 'enter order_id',
  //     },
  //   };
  // }

  // constructor(
  //   private orderser: OrderService,
  //   public dialog: MatDialog,
  //   private ngxService: NgxUiLoaderService
  // ) {}
  // fethorders() {
  //   this.ngxService.start();
  //   this.orderser.fetchallorders().subscribe((res: any) => {
  //     this.allorders = res;

  //     this.ngxService.stop();

  //     this.dtTrigger.next(null);
  //   });
  // }

  // openDialog(order: any): void {
  //   const dialogRef = this.dialog.open(OrderModelComponent, {
  //     data: { order_detail: order },
  //   });
  // }

  // filterdata() {
  //   const start = this.range.controls['start'].value;
  //   const end = this.range.controls['end'].value;

  //   if (start < end) {
  //     this.allorders = this.allorders.filter(function (a) {
  //       return a.createdat > start && a.createdat < end;
  //     });
  //     console.log(this.allorders);
  //   } else {
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'please select valid date',
  //       icon: 'warning',

  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'ok',
  //     });
  //   }
  // }
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public data: any[];
  public filteredData: any[];
  private unsubscribe$ = new Subject<void>();
  public dtTrigger: Subject<any> = new Subject();

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private orderser: OrderService,
    public dialog: MatDialog,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      retrieve: true,
      destroy: true,
    };

    // this.dtOptions = {
    //       // pagingType: 'full_numbers',
    //       // pagingType: 'simple',
    //       pagingType: 'simple_numbers',
    //       // pagingType: 'full_numbers' ,
    //       // pagingType: 'full',

    //       // searching:false
    //       paging: true,
    //       lengthChange: true,

    //       retrieve: true,
    //       language: {
    //         searchPlaceholder: 'enter order_id',
    //       },
    //     };

    this.orderser.fetchallorders();
    this.orderser.data$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      this.data = data;
      this.filteredData = data;
      this.dtTrigger.next(data);
    });
  }

  openDialog(order: any): void {
    const dialogRef = this.dialog.open(OrderModelComponent, {
      data: { order_detail: order },
    });
  }

  applyDateFilter(): void {
    const start = this.range.controls['start'].value;
    const end = this.range.controls['end'].value;

    if (start < end) {
      this.filteredData = this.data.filter(function (a) {
        return a.createdat > start && a.createdat < end;
      });
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.datatableElement.dtTrigger.next(null);
      });
    } else {
      this.range.reset({
        start: null,
        end: null,
      });
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to filter date please select valid date!",
        icon: 'warning',

        confirmButtonColor: '#3085d6',

        confirmButtonText: 'ok',
      });
    }
  }

  removefilter() {
    this.range.reset({
      start: null,
      end: null,
    });
    this.filteredData = this.data;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

  todayfilter() {
    const filter = this.data.filter(function (a) {
      return (
        new Date(a.createdat).setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0)
      );
    });
    this.filteredData = filter;

    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.datatableElement.dtTrigger.next(null);
    });
  }

  updateorder(order) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to approve this order',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,Approved',
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          isapprove: true,
        };
        this.orderser.updateorder(order._id, payload).subscribe((res: any) => {
          if (res.message == 'success') {
            order.isapprove = true;
          }
        });
      }
    });
  }

  selectdelivery(order: any) {
    this.orderser.selectdelivery(order._id).subscribe((res: any) => {
      if (res.message) {
        order.delevery.deleveryby = {
          name: 'comming soon',
        };
        Swal.fire({
          icon: 'success',
          title: 'deliveryman selecte successfull',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (!res.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No one deliveryman is free!',
        });
      }
    });
  }
}
