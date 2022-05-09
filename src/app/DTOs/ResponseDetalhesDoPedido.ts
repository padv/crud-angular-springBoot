import { ResponsePedidoNomeEQuantidadeItens } from "./ResponsePedidoNomeEQuantidadeItens";

export interface ResponseDetalhesDoPedido {
    valorTotal: number
    itens: Map<String,ResponsePedidoNomeEQuantidadeItens>
}