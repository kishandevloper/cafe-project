import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewBillComponent } from '../view-bill/view-bill.component';

@Component({
  selector: 'app-showbill.model',
  templateUrl: './showbill.model.component.html',
  styleUrls: ['./showbill.model.component.css'],
})
export class ShowbillModelComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewBillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogOverviewExample
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export class DialogOverviewExample {
  item_detail: Array<any>;
  total_amount: number;
}
