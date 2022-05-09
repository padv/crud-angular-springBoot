import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemDialogComponent } from './dialogs/item-dialog/item-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { ItemTableComponent } from './tables/item-table/item-table.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PedidoTableComponent } from './tables/pedido-table/pedido-table.component';
import { PedidoDialogComponent } from './dialogs/pedido-dialog/pedido-dialog.component';
import { EscolherItensDialogComponent } from './dialogs/escolher-itens-dialog/escolher-itens-dialog.component';
import { MatListModule } from '@angular/material/list';
import { DetalhesDoPedidoDialogComponent } from './dialogs/detalhes-do-pedido-dialog/detalhes-do-pedido-dialog.component';
import { DetalhesDoPedidoTableComponent } from './tables/detalhesDoPedido-table/detalhesDoPedido-table.component';
import { AdicionarItensNoPedidoTableComponent } from './tables/adicionarItensNoPedido-table/adicionarItensNoPedido-table.component';









@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ItemDialogComponent,
    ConfirmDialogComponent,
    ItemTableComponent,
    PedidoTableComponent,
    PedidoDialogComponent,
    EscolherItensDialogComponent,
    DetalhesDoPedidoDialogComponent,
    DetalhesDoPedidoTableComponent,
    AdicionarItensNoPedidoTableComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
