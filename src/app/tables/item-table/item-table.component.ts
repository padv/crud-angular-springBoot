import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Item } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item.service';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { ItemDialogComponent } from 'src/app/dialogs/item-dialog/item-dialog.component';

@Component({
  selector: 'app-item-table',
  templateUrl: '../../shared/tables-template/tables.component.html',
  styleUrls: ['../../shared/tables-scss/tables.component.scss'],
  providers: [ItemService]
})
export class ItemTableComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'nome', 'tipo', 'preco', 'actions'];
  nameColumns: string[] = ['ID', 'Nome', 'Tipo', 'Preço', 'Ações'];
  symbols: string[] = ['R$'];
  valorTotal!: number; // NÃO É UTILIZADO
  public quantidade : any = {};
  dataSource!: Item[];
  showAddButton: boolean = true;
  showEditButton: boolean = true;
  showDeleteButton: boolean = true;
  showDetailsButton: boolean = false;
  


  constructor(
    public dialog: MatDialog,
    public itemService: ItemService
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

  createRow(): void { // CRIA LINHA
    //console.log(this.nomeValido)
    this.openDialog(null);
  }

  optionsRow(item: Item): void { // EDITA LINHA
    this.openDialog(item);
  }

  deleteRow(id: string): void { // DELETA LINHA
    this.itemService.deleteItem(id)
      .subscribe((data) => {
        console.log(data);
        if (data.sucesso) {
          this.dataSource = this.dataSource.filter(row => row.id !== id);
        } else {
          alert(data.response)
        }
        
      });
  }

  showDetails(id: string): any { // MÉTODO NÃO EXISTE PARA ESSA TABLE

  }

  // MÉTODO PARA ABRIR DIÁLOGO RELACIONADO A ADIÇÃO/EDIT DE LINHAS DA TABELA.
  openDialog(item: Item | null): void { // SE PASSAR NULL COMO PARÂMETRO, SERÁ FEITO UM "CREATE". SE PASSAR ITEM, "PATCH".
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data: item === null ? {
        nome: "",
        tipo: "",
        preco: null
      } : {
        id: item.id,
        nome: item.nome,
        tipo: item.tipo,
        preco: item.preco
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined) { // SE RETORNAR undefined, SIGNIFICA QUE USUÁRIO FECHOU OU CANCELOU DIALOG SEM CONFIRMAR
        if (this.dataSource.map(row => row.id).includes(result.id)) { // VERIFICA SE EXISTE LINHA COM A ID PASSADA, SE SIM, FAZ UM EDIT.
          this.itemService.editItem(result)
            .subscribe((data : any) => {
              console.log(data.response);
              console.log(result);
              if (data.sucesso) {
                const index = this.dataSource.findIndex(row => row.id === result.id);
                this.dataSource[index] = result;  
                this.table.renderRows(); 
                
              } else {
                alert(data.response);
              }         
            });
        } else { // SE NÃO, FAZ UM CREATE
          this.itemService.createItem(result)
            .subscribe((data: Item) => {
              this.dataSource.push(data);
              this.table.renderRows();             
            });
        }       
      }
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