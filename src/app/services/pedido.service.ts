import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pedido } from "../models/Pedido";
import { ResponseDetalhesDoPedido } from "../DTOs/ResponseDetalhesDoPedido";
import { RequestPedido } from "../DTOs/RequestPedido";

@Injectable()
export class PedidoService {
    pedidoApiUrl = "http://localhost:8080/pedido/"
    constructor(private http: HttpClient) {}

    getPedidos() : Observable<Pedido[]> {
        return this.http.get<Pedido[]>(this.pedidoApiUrl);
    }

    getDetalhesPedido(id: string) : Observable<ResponseDetalhesDoPedido> {
        return this.http.get<ResponseDetalhesDoPedido>(this.pedidoApiUrl + id);
    }

    createPedido(requestPedido: RequestPedido) : Observable<Pedido> {
        return this.http.post<Pedido>(this.pedidoApiUrl, requestPedido);
    }

    editPedido(pedido: Pedido) : Observable<Pedido> {
        return this.http.patch<Pedido>(this.pedidoApiUrl + pedido.id, pedido);
    }

    deletePedido(id: string): Observable<any> {
        return this.http.delete<any>(this.pedidoApiUrl + id)
    }

}