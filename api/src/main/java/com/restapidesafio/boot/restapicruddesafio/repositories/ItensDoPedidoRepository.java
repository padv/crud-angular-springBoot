package com.restapidesafio.boot.restapicruddesafio.repositories;

import java.util.List;
import java.util.UUID;

import com.restapidesafio.boot.restapicruddesafio.entities.ItensDoPedido;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItensDoPedidoRepository extends JpaRepository<ItensDoPedido, UUID> {
    boolean existsItensDoPedidoByItemId(UUID id);
    List<ItensDoPedido> findByPedidoIdEquals(UUID id);
    List<ItensDoPedido> findByItemIdEquals(UUID id);
}   
