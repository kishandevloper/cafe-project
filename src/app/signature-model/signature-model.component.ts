import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersComponent } from '../client/orders/orders.component';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-signature-model',
  templateUrl: './signature-model.component.html',
  styleUrls: ['./signature-model.component.css'],
})
export class SignatureModelComponent {
  constructor(
    public dialogRef: MatDialogRef<OrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  signatureimg: string = '';
  onNoClick(): void {
    this.dialogRef.close();
  }

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: any = {
    // Configure the signature pad options
    minWidth: 2,
    canvasWidth: 500,
    canvasHeight: 300,
    penColor: 'rgb(66, 133, 244)',
    backgroundColor: 'rgb(255,255,255)',
  };

  clearSignature() {
    this.signaturePad.clear();
  }

  saveSignature() {
    this.signatureimg = this.signaturePad.toDataURL();
    // Do something with the signature data (e.g., send it to the server)
  }
}
export interface DialogData {
  data: any;
}
