import { StatusEnum } from "../enums/StatusEnum";

export interface Pedido {
    id: string
    status: StatusEnum
    desconto: number
    valorTotal: number   
}