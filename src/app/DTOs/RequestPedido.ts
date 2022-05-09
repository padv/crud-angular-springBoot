import { Pedido } from "../models/Pedido";

export interface RequestPedido {
    pedido: Pedido
    itens: object
}