// ENTIDADE PEDIDO.

package com.restapidesafio.boot.restapicruddesafio.entities;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.restapidesafio.boot.restapicruddesafio.enums.StatusEnum;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Pedido {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    StatusEnum status;
    Double desconto;


}