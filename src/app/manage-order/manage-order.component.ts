import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Item } from '../model/item';
import { OrderItem } from '../model/order-item';
import { BillService } from '../service/bill.service';
import { OrderService } from '../service/order.service';
import { saveAs } from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css'],
})
export class ManageOrderComponent implements OnInit {
  categorys: Array<any> = [];
  items: Array<any> = [];
  item: any;
  ngOnInit(): void {
    this.getcategory();
  }
  billitems: Array<any> = [];
  total_amount: number = 0;
  constructor(
    private fb: FormBuilder,
    private orderservice: OrderService,
    private billservice: BillService,
    private ngxService: NgxUiLoaderService
  ) {}

  customerdetailform: FormGroup = this.fb.group({
    customer_name: [],
    email: [],
    contact_no: [],
    pay_method: [],
  });

  additemform: FormGroup = this.fb.group({
    category: ['', Validators.required],
    item_name: ['', Validators.required],
    price: [],
    quantity: [],
    total: [],
  });

  submitbill() {
    Swal.fire({
      title: 'Are you sure?',

      imageUrl:
        'https://i.pinimg.com/originals/c0/34/17/c03417ebf4f447610528b07a704e0540.gif',
      imageWidth: 300,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Saved',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.customerdetailform.valid && this.total_amount > 0) {
          this.ngxService.start();
          const bill = {
            name: this.customerdetailform.controls['customer_name'].value,
            email: this.customerdetailform.controls['email'].value,
            contact_no: this.customerdetailform.controls['contact_no'].value,
            pay_method: this.customerdetailform.controls['pay_method'].value,
            total_amaount: this.total_amount,
            item_detail: this.billitems,
          };
          this.billservice.addbill(bill).subscribe((response: any) => {
            this.ngxService.stop();
            saveAs(response, bill.name + '.pdf');

            Swal.fire({
              icon: 'success',
              title: 'Your bill has been saved',
              showConfirmButton: false,
              timer: 1500,
            });
            this.additemform.reset();
            this.customerdetailform.reset();
            this.billitems = [];
          });
        }
      }
    });
  }

  additem() {
    if (this.additemform.valid) {
      this.billitems.push(this.additemform.value);
      console.log(this.additemform.value);
      const amount = parseInt(this.additemform.controls['total'].value);
      this.total_amount = this.total_amount + amount;
      this.additemform.reset();
    }
  }
  deleteitem(name: string, price: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.billitems.findIndex((item) => {
          return item.item_name == name;
        });

        this.billitems.splice(index, 1);
        const Amount = parseInt(price);
        this.total_amount = this.total_amount - Amount;
      }
    });
  }

  calculatetotal() {
    const price = parseInt(this.additemform.controls['price'].value);
    const quantity = parseInt(this.additemform.controls['quantity'].value);
    const total = price * quantity;
    this.additemform.controls['total'].setValue(total);
  }

  onselectproduct(event) {
    this.item = this.items.filter((item) => item.item_name == event.value);
    const price = String(this.item[0].price);

    this.additemform.controls['quantity'].setValue('1');
    this.additemform.controls['price'].setValue(price);
    this.calculatetotal();
  }

  getcategory() {
    this.ngxService.start();
    this.orderservice.getcategory().subscribe((res: any) => {
      this.categorys = res;
      this.ngxService.stop();
    });
  }

  async oncategoryselect(event) {
    const value = event.value;
    this.additemform.controls['item_name'].setValue('');
    this.additemform.controls['quantity'].setValue('0');
    this.additemform.controls['price'].setValue('0');
    this.additemform.controls['total'].setValue('0');
    this.orderservice.getitems(event.value).subscribe((res: any) => {
      this.items = res;
      console.log(res);
    });
  }
}
