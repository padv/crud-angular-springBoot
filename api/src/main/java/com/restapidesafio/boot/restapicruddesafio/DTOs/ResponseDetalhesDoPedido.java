// CLASSE QUE DEFINE A RESPONSE PARA REQUEST EM, /pedido/{ID-DO-PEDIDO}. 

package com.restapidesafio.boot.restapicruddesafio.DTOs;

import java.util.Map;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDetalhesDoPedido { // RETORNA O VALOR TOTAL DOS ITENS (JA COM O DESCONTO DO PEDIDO APLICADO SOMENTE NOS PRODUTOS) E UM MAP
                                        // COM (key : value) ID-DO-ITEM : OBJETO {NOME-DO-ITEM, QUANTIDADE}
    Double valorTotal;
    Map<UUID,ResponsePedidoNomeEQuantidadeItens> itens;
    
}
