import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CartService } from 'src/app/service/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthanticateService } from 'src/app/service/authanticate.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements AfterViewInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @ViewChild('closebutton') closebutton;
  user: any = {};
  cartitems: any = [];
  totalprice: number = 0;
  gst: number = 0;
  calcamount: number = 0;
  paymentform: FormGroup;

  constructor(
    private observer: BreakpointObserver,
    private cartser: CartService,
    private cookieservice: CookieService,
    private router: Router,
    private authser: AuthanticateService,
    private fb: FormBuilder,
    private orderser: OrderService,
    private ngxloader: NgxUiLoaderService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getcartitems();
    this.counttotal();
    this.paymentform = this.fb.group({
      name: [this.user.name, Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width : 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  navclose() {
    this.observer.observe(['(max-width : 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.close();
      }
    });
  }

  getcartitems() {
    this.cartser.getcart().subscribe((res: any) => {
      this.cartitems = res;
      this.counttotal();
    });
  }

  addcheese(event, item) {
    if (event.value == 2) {
      item.price = item.price + 25;
      item.isbutter = false;
      this.counttotal();
    } else {
      item.price = item.price - 25;
      item.isbutter = true;
      this.counttotal();
    }
  }

  deletecartitem(itemid) {
    this.cartser.deletecartitem(itemid).subscribe((res: any) => {
      if (res.message == 'delete') {
        this.cartitems = this.cartitems.filter((item) => {
          return item._id != itemid;
        });
        this.counttotal();

      }
    });
  }

  counttotal() {
    this.totalprice = 0;
    for (var i = 0; i < this.cartitems.length; i++) {
      this.totalprice += this.cartitems[i].price * this.cartitems[i].quantity;
    }
    this.gst = (this.totalprice * 5) / 100;
    this.calcamount = this.totalprice + this.gst - 30;
  }

  changequantity(item, isplus) {
    if (isplus) {
      item.quantity += 1;
    } else {
      item.quantity -= 1;
    }
    this.counttotal();
  }

  logout() {
    this.navclose();
    this.cookieservice.delete('token');
    this.router.navigateByUrl('/login');
  }

  pay(value) {
    console.log(value);
    this.ngxloader.start();
    this.authser.payment({ amount: value }).subscribe((res: any) => {
      this.ngxloader.stop();
      console.log(res);
      const options: any = {
        key: 'rzp_test_ajIN8w1f0JnoPa',
        amount: res.amount * 100, // amount should be in paise format to display Rs 1255 without decimal point
        currency: 'INR',
        name: 'Drew cafe', // company name or product name
        description: 'Cafe Payment', // product description
        image: '../../../assets/logo.jpg', // company logo or product image
        order_id: res.id, // order_id created by you in backend
        modal: {
          // We should prevent closing of the form when esc key is pressed.
          escape: false,
        },

        notes: {
          // include notes if any
        },

        theme: {
          color: '#c4996c',
        },
      };

      options.handler = (response, error) => {
        console.log(response);
        if (response) {
          this.ngxloader.start();
          this.authser.verify(response).subscribe((res: any) => {
            if (res.success) {
              const payload = {
                userid: this.user.id,
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                name: this.paymentform.controls['name'].value,
                address: this.paymentform.controls['address'].value,
                contact: this.paymentform.controls['contact'].value,
                payment: this.calcamount,
                cart: this.cartitems,
                delevery: {
                  deleveryby: '',
                  delevryat: '',
                },
              };

              this.orderser.createorder(payload).subscribe((res: any) => {
                if (res.isordercreate) {
                  this.closebutton.nativeElement.click();
                  this.router.navigateByUrl('/index/orders');
                  this.ngxloader.stop();

                  setTimeout(function () {
                    Swal.fire({
                      icon: 'success',
                      title: 'order successfull',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }, 1000);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'order unsucssesfull',
                  });
                }
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Transection Canceled!',
              });
            }
          });
        }
        if (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'order unsucssesfull',
          });
        }
      };

      options.modal.ondismiss = () => {
        // handle the case when user closes the form while transaction is in progress
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Transection Canceled!',
        });
      };

      const rzp = new this.authser.nativeWindow.Razorpay(options);
      // rzp.on('payment.failed', function (res) {});

      rzp.open();
    });
  }
}
