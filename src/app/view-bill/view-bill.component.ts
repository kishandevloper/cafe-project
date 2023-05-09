import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BillService } from '../service/bill.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowbillModelComponent } from '../showbill.model/showbill.model.component';
import { saveAs } from 'file-saver';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css'],
})
export class ViewBillComponent implements OnInit {
  bills: Array<any>;
  search: string = '';
  searchby = 'name';
  ngOnInit(): void {
    this.getbills();
  }
  constructor(private billservice: BillService, public dialog: MatDialog, private ngxService: NgxUiLoaderService) {}
  getbills() {
    this.ngxService.start();
    this.billservice.getbills().subscribe((res: any) => {
      this.bills = res;
    });
    this.ngxService.stop();
  }

  deletebill(id: string) {
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
        this.ngxService.start();
        this.billservice.deletebill(id).subscribe(
          (res: any) => {
            this.ngxService.stop();
            if (res.massage == 'deleted successfully') {
              Swal.fire('Deleted!', 'bill has been deleted.', 'success');
              const index = this.bills.findIndex((items) => {
                return items._id == id;
              });
              this.bills.splice(index, 1);
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

  openDialog(items: Array<any>, amount: number): void {
    const dialogRef = this.dialog.open(ShowbillModelComponent, {
      data: { item_detail: items, total_amount: amount },
    });
    console.log(items);
  }

  downloadpdf(bill: any) {
    this.ngxService.start();
    this.billservice.downloadbill(bill).subscribe((res) => {
      saveAs(res, bill.name + '.pdf');
    });
    this.ngxService.stop()
  }
}
