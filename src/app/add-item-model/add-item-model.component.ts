import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManageItemComponent } from '../manage-item/manage-item.component';
import { Item } from '../model/item';
@Component({
  selector: 'app-add-item-model',
  templateUrl: './add-item-model.component.html',
  styleUrls: ['./add-item-model.component.css'],
})
export class AddItemModelComponent {
  itemdata: Item = this.data.oneitem;

  additemform = this.fb.group({
    item_name: [this.itemdata.item_name, Validators.required],
    price: [this.itemdata.price, Validators.required],
    description: [this.itemdata.description, Validators.required],
    category: [this.itemdata.category, Validators.required],
    image: [],
  });
  imagesrc: String =
    this.itemdata.imagesrc ||
    'https://img.freepik.com/free-vector/coffee-shop-badge-vintage-style_1176-95.jpg';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ManageItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  @ViewChild('fileInput') fileInput: ElementRef;

  imageChnaged(event) {
    const file = event.target.files[0];
    if (file.size > 500000) {
      alert(
        "sorry...! ,file size limit is 500kb you can't upload more than 100kb filesize"
      );
      this.fileInput.nativeElement.value = '';
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.imagesrc = reader.result as string;
      };
    }
  }

  additem = {
    item_name: this.additemform.controls['item_name'].value,
    price: this.additemform.controls['price'].value,
    description: this.additemform.controls['description'].value,
    category: this.additemform.controls['category'].value,
  };
}

export interface DialogData {
  oneitem: Item;
  name: string;
  isbutton: string;
  option: Array<any>;
}
