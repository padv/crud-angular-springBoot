import { Component, OnInit, Inject } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoEnum } from "../../enums/TipoEnum";


@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html'
})
export class ItemDialogComponent implements OnInit {
  element!: Item;
  isChange!: boolean;
  public tipoEnum = TipoEnum;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: Item,
    public dialogRef: MatDialogRef<ItemDialogComponent>,   
  ) {}

  ngOnInit(): void {
      if (this.data.nome === "") {
        this.isChange = false;      
      } else {
        this.isChange = true;
      }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
