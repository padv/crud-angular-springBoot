import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { RequestPedido } from 'src/app/DTOs/RequestPedido';
import { StatusEnum } from 'src/app/enums/StatusEnum';
import { Item } from 'src/app/models/Item';
import { Pedido } from 'src/app/models/Pedido';
import { ItemService } from 'src/app/services/item.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { ItemDialogComponent } from 'src/app/dialogs/item-dialog/item-dialog.component';

@Component({
  selector: 'app-adicionarItensNoPedido-table',
  templateUrl: '../../shared/tables-template/tables.component.html',
  styleUrls: ['../../shared/tables-scss/tables.component.scss'],
  providers: [ItemService, PedidoService]
})
export class AdicionarItensNoPedidoTableComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'nome', 'tipo', 'preco', 'actions'];
  nameColumns: string[] = ['ID', 'Nome', 'Tipo', 'Preço', 'Quantidade'];
  symbols: string[] = ['R$'];
  valorTotal!: number; // NÃO É UTILIZADO
  @Input()
  pedido!: Pedido;
  public quantidade : any = {};
  dataSource!: Item[];
  showAddButton: boolean = false;
  showEditButton: boolean = false;
  showDeleteButton: boolean = false;
  showDetailsButton: boolean = false;
  


  constructor(
    public dialog: MatDialog,
    public itemService: ItemService,
    public pedidoService: PedidoService
    ) {
      this.itemService.getItens() // GET INICIAL DA TABELA NA HORA QUE O COMPONENTE É CONSTRUÍDO
        .subscribe((data: Item[]) => {
          const displayRows: Item[] = []
          data.forEach(row => { // MOSTRA APENAS OS ROWS QUE NÃO FORAM ARQUIVADOS
             if (!row.arquivado) {
               displayRows.push(row);
             }
          });
          this.dataSource = displayRows;
          
        });
      }

  ngOnInit(): void {
  }

  createPedido() { // FUNÇÃO PARA CRIAR NOVO PEDIDO
    const itens = new Map<string, number>();

    this.dataSource.forEach((row,i) => { 
      if(this.quantidade[i] > 0){  // CHECA SE USUÁRIO ADICIONOU O ITEM
        itens.set(row.id, this.quantidade[i])
      }     
    });

    const pedido: Pedido = { // CRIA PEDIDO COM O STATUS E DESCONTO CORRETOS
      id: '',
      status: this.pedido.status,
      desconto: this.pedido.desconto,
      valorTotal: 0
    }

    const requestPedido: RequestPedido = { // CRIA A REQUEST DE PEDIDO
      pedido: pedido,
      itens: Object.fromEntries(itens)
    }


    this.pedidoService.createPedido(requestPedido)
    .subscribe();

    this.dialog.closeAll();
    

  } 

  createRow(): void { 

  }

  optionsRow(item: Item): void { // NÃO É UTILIZADO

  }

  showDetails(id: string): any { // // NÃO É UTILIZADO

  }

  confirmDialog(id: string): void { // NÃO É UTILIZADO
  }
}