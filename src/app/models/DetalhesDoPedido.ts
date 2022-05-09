import { TipoEnum } from "../enums/TipoEnum";

export interface DetalhesDoPedido {
    id: string
    nome: string
    tipo: TipoEnum
    quantidade: string
    preco: number   
}