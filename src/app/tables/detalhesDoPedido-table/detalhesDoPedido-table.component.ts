import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { EscolherItensDialogComponent } from 'src/app/dialogs/escolher-itens-dialog/escolher-itens-dialog.component';
import { PedidoDialogComponent } from 'src/app/dialogs/pedido-dialog/pedido-dialog.component';
import { ResponseDetalhesDoPedido } from 'src/app/DTOs/ResponseDetalhesDoPedido';
import { DetalhesDoPedido } from 'src/app/models/DetalhesDoPedido';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/Item';
import { TipoEnum } from 'src/app/enums/TipoEnum';

@Component({
  selector: 'app-detalhesDoPedido-table',
  templateUrl: '../../shared/tables-template/tables.component.html',
  styleUrls: ['../../shared/tables-scss/tables.component.scss'],
  providers: [PedidoService, ItemService]
})
export class DetalhesDoPedidoTableComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  @Input()
  pedidoID!: string;
  displayedColumns: string[] = ['id', 'nome', 'tipo', 'quantidade', 'preco'];
  nameColumns: string[] = ['ID', 'Nome', 'Tipo','Quantidade', 'Preço'];
  symbols: string[] = ['', '', 'R$'];
  valorTotal!: number;
  dataSource!: DetalhesDoPedido[];
  public quantidade : any = {};
  showAddButton: boolean = false
  showEditButton: boolean = false;
  showDeleteButton: boolean = false;
  showDetailsButton: boolean = false;

  constructor(
    public dialog: MatDialog,
    public pedidoService: PedidoService,
    public itemService: ItemService
    ) {
      }

  ngOnInit(): void { 

    this.pedidoService.getDetalhesPedido(this.pedidoID) // GET INICIAL DA TABELA DEPOIS QUE O COMPONENTE É CONSTRUÍDO
      .subscribe((data : ResponseDetalhesDoPedido) => {
       const detalhesDoPedido: DetalhesDoPedido[] = this.montarDetalhesDoPedido(data);
       this.dataSource = detalhesDoPedido; // POSTA OS DETALHES DOS PEDIDOS COM O TIPO E VALOR DEFAULT

       detalhesDoPedido.forEach(row => { // FAZ REQUEST PARA O SERVIDOR QUE DEVOLVE O VALOR DO ITEM DE CADA ROW, PARA QUE SE POSSA PEGAR O TIPO E VALOR CORRETO.
        this.itemService.getItem(row.id).subscribe((item: Item) => {
          row.tipo = item.tipo;
          row.preco = item.preco;            
        });
      });

      this.valorTotal = data.valorTotal

      
       //this.dataSource = data;

        //ADICIONAR LÓGICA PARA RENDERIZAR TABLE COM OS DETALHES DO PEDIDO
     })
  }

  montarDetalhesDoPedido(data : ResponseDetalhesDoPedido) : DetalhesDoPedido[] | any { // MÉTODO RESPONSÁVEL EM PEGAR RESPONSE-DETALHE-DO-PEDIDO e TRANSFORMAR ELA EM UMA LISTA DE DETALHES-DO-PEDIDO
    console.log(data.itens);

    const detalhesDoPedido: DetalhesDoPedido[] = []
    for (const [key, value] of Object.entries(data.itens)) {
    
      console.log(key); // ID DO ITEM
      console.log(value.nome); // NOME
      console.log(value.quantidade); // QUANTIDADE

      detalhesDoPedido.push({
        id: key,
        nome: value.nome,
        tipo: TipoEnum["SERVICO"], // PASSANDO PRODUTO COMO DEFAULT
        quantidade: value.quantidade,
        preco: 0 // PASSANDO 0 COMO DEFAULT
      });
    
      // FALTA TIPO E VALOR (VOU TER QUE FAZER REQUEST COM O ID DO ITEM PARA PEGA-LO)
      // MOSTRAREI O VALOR NORMAL, SEM DESCONTO, E NO FINAL O VALOR TOTAL DO PEDIDO (TALVEZ COM A TAXA DE DESCONTOS DO LADO)
    
    }
    return detalhesDoPedido;
  }
  
    // MÉTODOS INUTILIZÁVEIS NESSA TABLE 
  createRow(): void { 
    
  }
  showDetails(id:string): void { 
    
  }
  confirmDialog(id:string): void { 
    
  }

  optionsRow(pedido: Pedido): void { 
    
  }

  createPedido() {}

}

