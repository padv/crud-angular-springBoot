package com.restapidesafio.boot.restapicruddesafio.repositories;

import java.util.UUID;

import com.restapidesafio.boot.restapicruddesafio.entities.Pedido;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, UUID> {
    
}
