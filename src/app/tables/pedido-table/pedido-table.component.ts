import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { EscolherItensDialogComponent } from 'src/app/dialogs/escolher-itens-dialog/escolher-itens-dialog.component';
import { PedidoDialogComponent } from 'src/app/dialogs/pedido-dialog/pedido-dialog.component';
import { ResponseDetalhesDoPedido } from 'src/app/DTOs/ResponseDetalhesDoPedido';
import { DetalhesDoPedidoDialogComponent } from 'src/app/dialogs/detalhes-do-pedido-dialog/detalhes-do-pedido-dialog.component';

@Component({
  selector: 'app-pedido-table',
  templateUrl: '../../shared/tables-template/tables.component.html',
  styleUrls: ['../../shared/tables-scss/tables.component.scss'],
  providers: [PedidoService]
})
export class PedidoTableComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'status', 'desconto', 'valorTotal', 'actions'];
  nameColumns: string[] = ['ID', 'Status', 'Desconto', 'Valor Total', 'Ações'];
  symbols: string[] = ['R$', '%'];
  valorTotal!: number;
  dataSource!: Pedido[];
  public quantidade : any = {};
  showAddButton: boolean = true;
  showEditButton: boolean = true;
  showDeleteButton: boolean = true;
  showDetailsButton: boolean = true;

  constructor(
    public dialog: MatDialog,
    public pedidoService: PedidoService
    ) {
      this.pedidoService.getPedidos() // GET INICIAL DA TABELA NA HORA QUE O COMPONENTE É CONSTRUÍDO
        .subscribe((data: Pedido[]) => { 
          this.dataSource = data;
          data.forEach(row => { // FAZ REQUEST PARA O SERVIDOR QUE DEVOLVE O VALOR TOTAL DE TODOS OS PEDIDOS.
            this.pedidoService.getDetalhesPedido(row.id).subscribe((pedidoDetalhado: any) => {
              row.valorTotal = pedidoDetalhado.valorTotal;              
            });
          });
          
        })
      }

  ngOnInit(): void {
  }

  createRow(): void { // CRIA PEDIDO
    //console.log(this.nomeValido)
    this.openDialog(null);
  }

  optionsRow(pedido: Pedido): void { // EDITA PEDIDO
    console.log(pedido);
    this.openDialog(pedido);
  }

  deleteRow(id: string): void { // DELETA PEDIDO
    this.pedidoService.deletePedido(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(row => row.id !== id);
      });
  }

  showDetails(id: string): any { // MÉTODO PARA ABRIR DIALOG COM DETALHES DO PEDIDO
    console.log(id);
    const detalhesPedidoDialog = this.dialog.open(DetalhesDoPedidoDialogComponent, {
      width: '100%',
      height: '100%',
      data: id
    });
  }

  // MÉTODO PARA ABRIR DIÁLOGO RELACIONADO A ADIÇÃO/EDITAR PEDIDOS.
  openDialog(pedido: Pedido | null): void { // SE PASSAR NULL COMO PARÂMETRO, SERÁ FEITO UM "CREATE".
    const dialogRef = this.dialog.open(PedidoDialogComponent, {
      width: '300px',
      data: pedido === null ? {
        id: "",
        valorTotal: null,
      } : {
        id: pedido.id,
        status: pedido.status,
        desconto: pedido.desconto,
        valorTotal: pedido.valorTotal
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined) { // SE RETORNAR undefined, SIGNIFICA QUE USUÁRIO FECHOU OU CANCELOU DIALOG SEM CONFIRMAR
        if (this.dataSource.map(row => row.id).includes(result.id)) { // VERIFICA SE EXISTE LINHA COM A ID PASSADA, SE SIM, FAZ UM EDIT.
          this.pedidoService.editPedido(result)
            .subscribe((data: Pedido) => {
              const index = this.dataSource.findIndex(row => row.id === data.id);
              data.valorTotal = this.dataSource[index].valorTotal // SALVA VALOR FINAL PARA NÃO TER QUE FAZER OUTRA REQUEST PEDINDO O MESMO
              this.dataSource[index] = data;  
              this.table.renderRows();          
            });
          

        } else { // SE NÃO, FAZ UM CREATE
            console.log(result);
            this.itensDoPedidoDialog(result); // MOSTRA DIALOG DE ITENS DO PEDIDO
        }       
      }
    });
  }

  itensDoPedidoDialog(pedido: Pedido) {
    const dialogRef = this.dialog.open(EscolherItensDialogComponent, {
      width: '100%',
      height:'100%',
      data: pedido
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined) { // SE RETORNAR undefined, SIGNIFICA QUE USUÁRIO FECHOU OU CANCELOU DIALOG SEM CONFIRMAR
        
      }  
      location.reload(); // temporário
   
    });
  }

  confirmDialog(id: string): void { // CAIXA DE DIÁLOGO PARA CONFIRMAR O DELETE
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'});
   
    dialogRef.afterClosed().subscribe(result => { 
      if (result === true) {
        this.deleteRow(id);
      }
    })
  }

  createPedido() {}
}

