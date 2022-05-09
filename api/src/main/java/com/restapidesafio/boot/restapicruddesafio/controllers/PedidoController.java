//CONTROLLER RESPONSÁVEL PELAS REQUESTS DA API/pedido

package com.restapidesafio.boot.restapicruddesafio.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.restapidesafio.boot.restapicruddesafio.DTOs.ResponsePedidoNomeEQuantidadeItens;
import com.restapidesafio.boot.restapicruddesafio.DTOs.RequestPedido;
import com.restapidesafio.boot.restapicruddesafio.DTOs.ResponseDetalhesDoPedido;
import com.restapidesafio.boot.restapicruddesafio.entities.Item;
import com.restapidesafio.boot.restapicruddesafio.entities.ItensDoPedido;
import com.restapidesafio.boot.restapicruddesafio.entities.Pedido;
import com.restapidesafio.boot.restapicruddesafio.enums.StatusEnum;
import com.restapidesafio.boot.restapicruddesafio.enums.TipoEnum;
import com.restapidesafio.boot.restapicruddesafio.repositories.ItemRepository;
import com.restapidesafio.boot.restapicruddesafio.repositories.ItensDoPedidoRepository;
import com.restapidesafio.boot.restapicruddesafio.repositories.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class PedidoController {
    
    @Autowired
    ItemRepository repositoryItem;
    @Autowired
    PedidoRepository repositoryPedido;
    @Autowired
    ItensDoPedidoRepository repositoryItensDoPedido;

    @GetMapping("/pedido") // RETORNA TODA LISTA DE TODOS OS PEDIDOS
    public List<Pedido> getAllPedidos(){
        return repositoryPedido.findAll();
    }

    @GetMapping("/pedido/{id}") // RETORNA DETALHES DO PEDIDO ESPECÍFICO USANDO ID COMO PARÂMETRO (VALOR TOTAL DO PEDIDO E TODOS ITENS COM SUAS IDS, NOMES E QUANTIDADE)
    public ResponseDetalhesDoPedido getPedidoById(@PathVariable UUID id){
        List<ItensDoPedido> itensDoPedido = repositoryItensDoPedido.findByPedidoIdEquals(id);
        Double valorTotal = 0.0;
        Map<UUID,ResponsePedidoNomeEQuantidadeItens> itens = new HashMap<>();

        for(ItensDoPedido itemDoPedido : itensDoPedido) {
            valorTotal += itemDoPedido.getPrecoFinal(); // SOMA TODOS OS VALORES DE CADA ITEM DO PEDIDO
            UUID itemId = itemDoPedido.getItemId(); //PEGA TODOS OS IDS
            Item item = repositoryItem.findById(itemId).get();
            String nome = item.getNome(); // PEGA TODOS OS NOMES
            Integer quantidade = itemDoPedido.getQuantidade(); // PEGA A QUANTIDADE DE CADA ITEM
            ResponsePedidoNomeEQuantidadeItens itemNomeEQuantidade = new ResponsePedidoNomeEQuantidadeItens(nome, quantidade);
            itens.put(itemId, itemNomeEQuantidade);
        }
        
        ResponseDetalhesDoPedido detalhesDoPedido = new ResponseDetalhesDoPedido(valorTotal, itens);
        System.out.println(detalhesDoPedido);
        return detalhesDoPedido;
    }

    @PostMapping("/pedido") // CRIA NOVO PRODUTO/SERVIÇO
    public Pedido savePedido(@RequestBody RequestPedido requestPedido){
        
        Map<UUID, Integer> itens = requestPedido.getItens();
        Pedido pedido = requestPedido.getPedido();


        repositoryPedido.save(pedido); // CRIA UMA ENTRADA NA TABELA PEDIDO
    
        UUID pedidoId = pedido.getId();
        Double desconto = pedido.getDesconto();
        StatusEnum status = pedido.getStatus();

        List<ItensDoPedido> listaItensDoPedido = new ArrayList<>(); // LISTA DOS ITENS DO PEDIDO
        
        for (Map.Entry<UUID, Integer> item : itens.entrySet()) { // FUNÇÃO PARA ADICIONAR NOVAS ENTRADAS NA TABELA AUXILIAR ITENS_DO_PEDIDO
            UUID itemId = item.getKey(); // ID DO ITEM
            Integer quantidade = item.getValue(); // QUANTIDADE DE CÓPIAS DO ITEM NO PEDIDO

            try { 
                Item linha = repositoryItem.findById(itemId).get();
                TipoEnum tipo = linha.getTipo();
            
                Double precoFinal = repositoryItem.getById(itemId).getPreco() * quantidade;
                if (tipo == TipoEnum.PRODUTO && status == StatusEnum.ABERTO) { // APLICA DESCONTO INFORMADO NO PEDIDO APENAS NOS ITENS MARCADOS COMO "PRODUTO" E STATUS "ABERTO"
                    precoFinal -= (precoFinal * (desconto/100));                                   
                }
                ItensDoPedido itensDoPedido = new ItensDoPedido(itemId, pedidoId, quantidade, tipo, precoFinal);
                listaItensDoPedido.add(itensDoPedido);
                
            }
            catch(Exception e){ // SE ALGUMA ID DE ALGUM ITEM ESTIVER INCORRETO, DELETA A ENTRADA NA TABELA PEDIDO
                repositoryPedido.deleteById(pedidoId); 
                return repositoryPedido.findById(pedidoId).get();
            }         
        }
        repositoryItensDoPedido.saveAll(listaItensDoPedido); // SALVA ENTRADAS NA TABELA ITENS_DO_PEDIDO
        return repositoryPedido.findById(pedidoId).get();
        
    }

    @PatchMapping("/pedido/{id}") // PERMITE ALTERAR STATUS DO PEDIDO (ABERTO/FECHADO) (UPDATE)
    public Pedido updatePedido(@PathVariable UUID id, @RequestBody Pedido newPedido){
        Pedido pedido = repositoryPedido.findById(id).get();
        pedido.setStatus(newPedido.getStatus());
        
        return repositoryPedido.save(pedido);   
    }

    @DeleteMapping("/pedido/{id}") // DELETA PEDIDO ESPECÍFICO USANDO ID COMO PARÂMETRO (DELETE)
    public void deletePedido(@PathVariable UUID id){
        
        List<ItensDoPedido> itensDoPedido = repositoryItensDoPedido.findByPedidoIdEquals(id);

        for(ItensDoPedido itemDoPedido : itensDoPedido) { // DELETA TODOS AS ENTRADAS RELACIONADAS A ESSE PEDIDO NA TABELA AUXILIAR ITENS_DO_PEDIDO
            repositoryItensDoPedido.deleteById(itemDoPedido.getId());
        }
        repositoryPedido.deleteById(id);
         
    }
    

}   
