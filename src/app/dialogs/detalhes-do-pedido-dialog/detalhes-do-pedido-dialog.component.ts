import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalhesDoPedido } from 'src/app/models/DetalhesDoPedido';

@Component({
  selector: 'app-detalhes-do-pedido-dialog',
  templateUrl: './detalhes-do-pedido-dialog.component.html'
})

export class DetalhesDoPedidoDialogComponent implements OnInit {


  constructor(
  @Inject(MAT_DIALOG_DATA) 
  public pedidoID: string,
  public dialogRef: MatDialogRef<DetalhesDoPedidoDialogComponent>) {}


  ngOnInit(): void {
     
  }

}
