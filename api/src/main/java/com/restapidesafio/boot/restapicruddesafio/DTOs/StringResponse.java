// CLASSE QUE DEFINE FORMATO DA RESPOSTA E BOOLEANO QUE REPRESENTA SUCESSO OU NÃO PARA AS REQUESTS DE EDIT E DELETAR DOS ITENS.
package com.restapidesafio.boot.restapicruddesafio.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StringResponse {

    private String response;
    private boolean sucesso;

}