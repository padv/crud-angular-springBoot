// CLASSE QUE DEFINE FORMATO DO REQUEST DE CRIAR PEDIDO

package com.restapidesafio.boot.restapicruddesafio.DTOs;

import java.util.Map;
import java.util.UUID;

import com.restapidesafio.boot.restapicruddesafio.entities.Pedido;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestPedido {
    
    Pedido pedido;
    Map<UUID,Integer> itens;
}
