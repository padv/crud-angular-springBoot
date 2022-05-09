package com.restapidesafio.boot.restapicruddesafio.repositories;

import java.util.UUID;

import com.restapidesafio.boot.restapicruddesafio.entities.Item;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    
}
