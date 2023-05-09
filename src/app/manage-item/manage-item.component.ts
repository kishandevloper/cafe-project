import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { AddItemModelComponent } from '../add-item-model/add-item-model.component';
import { Item } from '../model/item';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.css'],
})
export class ManageItemComponent implements OnInit {
  serchcategory: string = '';
  searchby: string = 'item_name';

  name: string;
  oneitem: Item;
  items: Array<any> = [];
  categorys = Array<any>;
  imagesrc: any;
  ngOnInit(): void {}
  constructor(public dialog: MatDialog, private itemservice: ItemService , private ngxService: NgxUiLoaderService) {
    this.getproduct();
    this.getallcategory();
  }

  getallcategory() {
    this.ngxService.start();
    this.itemservice.getallcategory().subscribe((res: any) => {
      this.categorys = res;
      this.ngxService.stop();
    });
  }
  addproduct() {
    const dialogRef = this.dialog.open(AddItemModelComponent, {
      data: {
        name: 'Enter new Product Detail',
        oneitem: {},
        isbutton: 'add',
        option: this.categorys,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      const item = {
        item_name: result[1].item_name,
        price: result[1].price,
        category: result[1].category,
        description: result[1].description,
        imagesrc: result[0],
        isenable: false,
      };
      this.ngxService.start();
      this.itemservice.additem(item).subscribe(
        (res: any) => {
          if (res.isadd == true) {
            this.ngxService.stop();
            Swal.fire({
              icon: 'success',
              title: 'Item has been added successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            this.items.push(res);
          } else {
            this.ngxService.stop();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        },
        (err) => {
          this.ngxService.stop();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: err,
          });
        }
      );
    });
  }

  async getproduct() {
     this.ngxService.start();
    this.itemservice.getitem().subscribe(
      async (res) => {
        this.items = await res;
        this.ngxService.stop();
      },
      (err) => {
        this.ngxService.stop();
        console.log(err);
      }
    );
  }

  showimage(src: string, title: string) {
    Swal.fire({
      title: title,
      imageUrl: src,
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: 'Custom image',
      showCloseButton: true,
      showConfirmButton: false,
      background: '#F2F2F2',
    });
  }

  editproduct(item: Item) {
    console.log(this.categorys);
    const dialogRef = this.dialog.open(AddItemModelComponent, {
      data: {
        name: 'Edit Product Detail',
        oneitem: item,
        isbutton: 'update',
        option: this.categorys,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const updateitem = {
        _id: result[2],
        item_name: result[1].item_name,
        price: result[1].price,
        category: result[1].category,
        description: result[1].description,
        imagesrc: result[0],
        isenable: item.isenable,
      };
      this.ngxService.start();
      this.itemservice.edititem(updateitem).subscribe(
        (res: any) => {
          if ((res.isupdate = true)) {
            const index = this.items.findIndex((item) => {
              return item._id == res._id;
            });
            if (index > -1) {
              this.items.splice(index, 1);
              this.items.push(res);
              this.ngxService.stop();
              Swal.fire('Updated!', 'Your Item has been Updated.', 'success');
            }
          }
        },
        (err) => {
          console.log(err);
          this.ngxService.stop();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: err,
          });
        }
      );
    });
  }

  deleteitem(id: string, category: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      imageUrl:
        'https://cdn.dribbble.com/users/2124240/screenshots/6118828/delete_icon_intraction.gif',
      imageWidth: 200,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxService.start();
        this.itemservice.deleteitem(id, category).subscribe(
          (res: any) => {
            if (res.isdelete == true) {
              this.ngxService.stop();
              Swal.fire('Deleted!', 'Your Item has been deleted.', 'success');
              const index = this.items.findIndex((item) => {
                return item._id == id;
              });
              if (index > -1) {
                this.items.splice(index, 1);
              }
            }
          },
          (err) => {
            this.ngxService.stop();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: err,
            });
          }
        );
      }
    });
  }

  changedtoggle(event: MatSlideToggleChange, item: Item) {
    this.ngxService.start();
    if (event.checked) {

      const payload = {
        ...item,
        isenable: true,
      };
      this.itemservice.edititem(payload).subscribe();
      this.ngxService.stop();
    } else {

      const payload = {
        ...item,
        isenable: false,
      };
      console.log('this toggle value is false');
      this.itemservice.edititem(payload).subscribe();
      this.ngxService.stop();
    }
  }
}
