import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pedido } from 'src/app/models/Pedido';
import { StatusEnum } from 'src/app/enums/StatusEnum';

@Component({
  selector: 'app-pedido-dialog',
  templateUrl: './pedido-dialog.component.html'
})
export class PedidoDialogComponent implements OnInit {

  element!: Pedido;
  isChange!: boolean;
  public statusEnum = StatusEnum;
  public desconto!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: Pedido,
    public dialogRef: MatDialogRef<PedidoDialogComponent>,   
  ) {}

  ngOnInit(): void {
      if (this.data.valorTotal == null) {
        this.isChange = false;      
      } else {
        this.isChange = true;
      }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
