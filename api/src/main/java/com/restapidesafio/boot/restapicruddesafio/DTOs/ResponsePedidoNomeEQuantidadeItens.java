// CLASSE NOME DO ITEM E QUANTIDADE EM UM PEDIDO

package com.restapidesafio.boot.restapicruddesafio.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponsePedidoNomeEQuantidadeItens {
    String nome;
    Integer quantidade;
}
