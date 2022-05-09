// ENTIDADE ITENS DO PEDIDO.

package com.restapidesafio.boot.restapicruddesafio.entities;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.restapidesafio.boot.restapicruddesafio.enums.TipoEnum;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode.Exclude;

@Entity
@Data
@NoArgsConstructor
public class ItensDoPedido {

    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Exclude
    UUID id;
    UUID itemId;
    UUID pedidoId;
    Integer quantidade;
    TipoEnum tipo;
    Double precoFinal;

    public ItensDoPedido(UUID itemId, UUID pedidoId, Integer quantidade, TipoEnum tipo, Double precoFinal) {
        this.itemId = itemId;
        this.pedidoId = pedidoId;
        this.quantidade = quantidade;
        this.tipo = tipo;
        this.precoFinal = precoFinal;
    }
}