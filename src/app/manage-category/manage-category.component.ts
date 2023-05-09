import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import Swal from 'sweetalert2';
import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css'],
})
export class ManageCategoryComponent implements OnInit {
  serchby:string = 'name';
  categorys: Array<any> = [];
  serchname: string = '';
  ngOnInit(): void {
    this.getcategory();
  }
  constructor(
    private categoryservice: CategoryService,
    private cdr: ChangeDetectorRef , private ngxService: NgxUiLoaderService
  ) {}

  getcategory() {
    this.ngxService.start();
    this.categoryservice.getcategory().subscribe(
      (category: any) => {
        this.categorys = category;
        this.ngxService.stop();
      },
      (err) => {
        console.log(err);
        this.ngxService.stop();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<p>' + err + '</p>',
        });
      }
    );
  }

  async addcategory() {
    const { value: text } = await Swal.fire({
      input: 'text',
      inputLabel: 'Category :',
      html: '<h2>Enter new food Category<h2>',
      inputPlaceholder: 'Food Name',
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      showCancelButton: true,
      cancelButtonColor: '#FF0000',
      confirmButtonText: '<i class="fa-solid fa-circle-plus"></i> Add',
      confirmButtonColor: '	#22bb33',
    });

    if (text) {
      this.ngxService.start()
      this.categoryservice.addcategory(text).subscribe((res) => {
        if (res) {
          this.categorys.push(res);
          this.ngxService.stop();
          console.log(this.categorys);
          Swal.fire({
            icon: 'success',
            title: text + ' 🍴 Category have been added Succesfully 😁 ',
            showConfirmButton: false,
            timer: 1800,
          });
        }
      });
    }
  }

  async editcategory(category: Category) {
    const { value: text } = await Swal.fire({
      input: 'text',
      inputLabel: 'Category :',
      html: '<h2>Enter new food Category<h2>',

      inputValue: category.name,
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      showCancelButton: true,
      cancelButtonColor: '#FF0000',
      confirmButtonText: '<i class="fa-solid fa-pen-to-square"></i> Update',
      confirmButtonColor: '	#22bb33',
    });

    if (text) {
      this.ngxService.start();
      this.categoryservice.updatecategory(category._id, text).subscribe(
        (res: any) => {
          const findindex = this.categorys.findIndex((cat: Category) => {
            return cat._id === category._id;
          });
          if (findindex > 0) {
            this.categorys.splice(findindex, 1);
            this.categorys.push(res);
            this.ngxService.stop();
            Swal.fire({
              icon: 'success',
              title: 'Category have been Updated Succesfully 😁 ',
              showConfirmButton: false,
              timer: 1800,
            });
          }
        },
        (err) => {
          console.log(err);
          this.ngxService.stop();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
    }
  }
}
