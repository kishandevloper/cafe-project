import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllOrdersComponent } from '../all-orders/all-orders.component';
@Component({
  selector: 'app-order-model',
  templateUrl: './order-model.component.html',
  styleUrls: ['./order-model.component.css'],
})
export class OrderModelComponent {
  constructor(
    public dialogRef: MatDialogRef<AllOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogOverviewExample
  ) {
    console.log(data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

export class DialogOverviewExample {
  order_detail: any;
}
