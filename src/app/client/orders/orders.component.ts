import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from 'src/app/service/order.service';

import { MatDialog } from '@angular/material/dialog';
import { SignatureModelComponent } from 'src/app/signature-model/signature-model.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  signature: any = '';

  openDialog(): void {
    const dialogRef = this.dialog.open(SignatureModelComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result == '' || result == undefined) {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'plesae save the signature !',
        });
      } else {
        this.signature = result;
        Swal.fire({
          title: 'do you want to complete a order?',
          imageUrl: result,
          imageWidth: 400,
          imageHeight: 400,
          imageAlt: 'Custom image',
          showCancelButton: true,
          cancelButtonColor: 'red',
          confirmButtonText:
            '<i class="fa-solid fa-check">&nbsp;</i>successfull',
          confirmButtonColor: 'green',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            const payload = {
              deleveryby: {
                id: this.userid,
                name: this.userdetail.name,
              },
              signature: this.signature,
              orderid: this.orders[0]._id,
            };
            this.orderser.completeorder(payload).subscribe((res: any) => {
              if (res.iscomplete) {
                const userdetail = JSON.parse(sessionStorage.getItem('user'));
                userdetail.workingon = '';
                sessionStorage.setItem('user', JSON.stringify(userdetail));
                this.orders = [];
                Swal.fire({
                  icon: 'success',
                  title: 'Your work has been completed !',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
          }
        });
      }
    });
  }

  orders: Array<any> = [];
  userid: string;
  userdetail: any;
  ngOnInit(): void {
    this.userdetail = JSON.parse(sessionStorage.getItem('user'));
    this.userid = this.userdetail.id;
    if (this.userdetail.workingon !== '') {
      this.fetchorders();
    }
  }
  constructor(
    private orderser: OrderService,
    private ngxloader: NgxUiLoaderService,
    public dialog: MatDialog
  ) {}
  fetchorders() {
    this.ngxloader.start();
    if (this.userdetail.role == 'user' || this.userdetail.role == 'admin') {
      this.orderser.fetchorders(this.userid).subscribe((res: any) => {
        this.orders = res;
        this.ngxloader.stop();
      });
    } else {
      this.orderser
        .fetchsingleorderby_orderid(this.userdetail.workingon)
        .subscribe((res: any) => {
          this.orders = [res];
          this.ngxloader.stop();
        });
    }
  }
}
