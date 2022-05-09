// ENTIDADE PRODUTO/SERVIÇO, AQUI CHAMO DE "ITEM" PARA MAIS CLAREZA.

package com.restapidesafio.boot.restapicruddesafio.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.restapidesafio.boot.restapicruddesafio.enums.TipoEnum;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Item {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    TipoEnum tipo;
    String nome;
    @Column(columnDefinition="numeric", precision=4, scale=2)
    Double preco;
    boolean arquivado;

}
