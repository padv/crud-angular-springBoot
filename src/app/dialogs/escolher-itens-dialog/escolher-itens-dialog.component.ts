import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestPedido } from 'src/app/DTOs/RequestPedido';
import { ResponseDetalhesDoPedido } from 'src/app/DTOs/ResponseDetalhesDoPedido';
import { StatusEnum } from 'src/app/enums/StatusEnum';
import { Pedido } from 'src/app/models/Pedido';

@Component({
  selector: 'app-escolher-itens-dialog',
  templateUrl: './escolher-itens-dialog.component.html'
})
export class EscolherItensDialogComponent implements OnInit {

  isChange!: boolean;
  //public statusEnum = StatusEnum;

  constructor(
    public dialogRef: MatDialogRef<EscolherItensDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public pedido: Pedido

  ) {}

  ngOnInit(): void {
    
      /*if (this.data.valorTotal == 1) {
        console.log(this.data.valorTotal);
        this.isChange = true;      
      } else {
        this.isChange = false;
      }*/
  }

  onCancel(): void {
    this.dialogRef.close();
    
  }

}
