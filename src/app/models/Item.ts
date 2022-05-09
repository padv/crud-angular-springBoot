import { TipoEnum } from "../enums/TipoEnum";

export interface Item {
    id: string
    nome: string
    tipo: TipoEnum
    preco: number
    arquivado: boolean    
}