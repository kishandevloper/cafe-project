import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';
import AOS from 'aos';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { CartService } from 'src/app/service/cart.service';
import { IndexComponent } from '../index/index.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categorys: Array<any> = [];
  items: Array<any> = [];
  filteritems: Array<any> = [];

  @Output() countcart = new EventEmitter<number>();
  constructor(
    private itemser: ItemService,
    private ngxloader: NgxUiLoaderService,
    private cartser: CartService,
    private index: IndexComponent
  ) {}
  ngOnInit(): void {
    this.getallcategory();
    this.getallitems();
    AOS.init();
  }

  getallcategory() {
    this.itemser.getallcategory().subscribe((res: any) => {
      this.categorys = res;
    });
  }

  getallitems() {
    this.ngxloader.start();
    this.itemser.getitem().subscribe((res: any) => {
      this.filteritems = res;
      this.items = res;
      console.log(res);
      this.ngxloader.stop();
    });
  }

  finditem(name: string) {
    this.filteritems = [];
    this.items.filter((item) => {
      if (item.category === name) {
        this.filteritems.push(item);
      }
    });
  }

  setallitems() {
    this.filteritems = this.items;
  }

  addcart(Item: any) {
    const isitemexist = this.index.cartitems.filter((item) => {
      return item._id == Item._id;
    });

    if (isitemexist.length == 1) {
      alert('item already added');
    } else {
      this.cartser
        .addcart({ ...Item, isbutter: true })
        .subscribe((res: any) => {
          if (res.message == 'save') {
            this.index.cartitems.push(Item);
          }
        });
    }
  }

  addcountcart(count) {
    console.log(count);
    this.countcart.emit(count);
  }
}
