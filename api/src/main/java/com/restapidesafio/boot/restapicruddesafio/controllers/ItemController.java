//CONTROLLER RESPONSÁVEL PELAS REQUESTS DA API/itens

package com.restapidesafio.boot.restapicruddesafio.controllers;

import java.util.List;
import java.util.UUID;

import com.restapidesafio.boot.restapicruddesafio.DTOs.StringResponse;
import com.restapidesafio.boot.restapicruddesafio.entities.Item;
import com.restapidesafio.boot.restapicruddesafio.entities.ItensDoPedido;
import com.restapidesafio.boot.restapicruddesafio.entities.Pedido;
import com.restapidesafio.boot.restapicruddesafio.enums.StatusEnum;
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
public class ItemController {
    
    @Autowired
    ItemRepository repositoryItem;
    @Autowired
    ItensDoPedidoRepository repositoryItensDoPedido;
    @Autowired
    PedidoRepository repositoryPedido;
    

    @GetMapping("/itens") // RETORNA TODA LISTA DE PRODUTOS/SERVIÇOS (GET)
    public List<Item> getAllItens(){
        return repositoryItem.findAll();
    }

    @GetMapping("/itens/{id}") // RETORNA PRODUTO/SERVIÇO ESPECÍFICO USANDO ID COMO PARÂMETRO (GET)
    public Item getItemById(@PathVariable UUID id){
        return repositoryItem.findById(id).get();
    }

    @PostMapping("/itens") // CRIA NOVO PRODUTO/SERVIÇO (POST)
    public Item saveItem(@RequestBody Item item){
        return repositoryItem.save(item);
    }
    
    @PatchMapping("/itens/{id}") // PERMITE ALTERAR NOME, TIPO E/OU PREÇO DO PRODUTO/SERVIÇO (PATCH)
    public StringResponse updateItem(@PathVariable UUID id, @RequestBody Item newItem){
        Item item = repositoryItem.findById(id).get();

        boolean exists = repositoryItensDoPedido.existsItensDoPedidoByItemId(id); // VERIFICA SE ITEM EXISTE EM ALGUM PEDIDO
        boolean invalid = false;

        if (exists){ // SE EXISTIR, VERIFICA O STATUS DOS PEDIDOS RELACIONADOS A ESSE ITEM. 
            List<ItensDoPedido> itensDoPedido = repositoryItensDoPedido.findByItemIdEquals(id);
            for(ItensDoPedido itemDoPedido : itensDoPedido) {
                UUID pedidoId = itemDoPedido.getPedidoId();
                Pedido pedido =  repositoryPedido.findById(pedidoId).get();
                if (pedido.getStatus() == StatusEnum.ABERTO) { // SE ACHAR ALGUM COM O STATUS ABERTO, MUDA BOOL INVALID PARA PRIMEIRO VALOR (FALSE) E QUEBRA LOOP
                    invalid = true;
                    break;                   
                }
            }
        }
        if (!invalid){ //  EDITA PRODUTO/SERVIÇO APENAS SE ELE NÃO FIZER PARTE DE ALGUM PEDIDO ABERTO
            if (item.isArquivado()) { // IMPEDE O DELETE DE UM ITEM ARQUIVADO
                StringResponse stringResponse = new StringResponse("Não é possível editar um item arquivado.", false);
                return stringResponse;
            }
            item.setNome(newItem.getNome());
            item.setPreco(newItem.getPreco());
            item.setTipo(newItem.getTipo());
            repositoryItem.save(item);
            StringResponse stringResponse = new StringResponse("Item ID: " + id + " editado com sucesso.", true);
            return stringResponse;
        }

        StringResponse stringResponse = new StringResponse("Item ID: " + id + " não pode ser editado, pois ele faz parte de um ou mais Pedidos Abertos.", false);
        return stringResponse;
    }

    
    @DeleteMapping("/itens/{id}") // DELETA OU ARQUIVA PRODUTO/SERVIÇO ESPECÍFICO USANDO ID COMO PARÂMETRO (DELETE)
    public StringResponse deleteItem(@PathVariable UUID id){
        Item item = repositoryItem.findById(id).get();

        boolean exists = repositoryItensDoPedido.existsItensDoPedidoByItemId(id); // VERIFICA SE ITEM EXISTE EM ALGUM PEDIDO
        boolean invalid = false;

        if (exists){ // SE EXISTIR, VERIFICA O STATUS DOS PEDIDOS RELACIONADOS A ESSE ITEM.
            List<ItensDoPedido> itensDoPedido = repositoryItensDoPedido.findByItemIdEquals(id);
            for(ItensDoPedido itemDoPedido : itensDoPedido) {
                UUID pedidoId = itemDoPedido.getPedidoId();
                Pedido pedido =  repositoryPedido.findById(pedidoId).get();
                if (pedido.getStatus() == StatusEnum.ABERTO) { // SE ACHAR ALGUM COM O STATUS ABERTO, MUDA BOOL INVALID PARA TRUE
                    invalid = true;
                    break;                   
                }
            }
        } else { // DELETA PRODUTO/SERVIÇO APENAS SE ELE NÃO FIZER PARTE DE ALGUM PEDIDO 
            if (item.isArquivado()) { // IMPEDE O DELETE DE UM ITEM ARQUIVADO
                StringResponse stringResponse = new StringResponse("Item ID: " + id + " não pode ser DELETADO pois está arquivado.", false);
                return stringResponse;
            } 
            repositoryItem.deleteById(id); 
            StringResponse stringResponse = new StringResponse("Item ID: " + id + " DELETADO com sucesso.", true);
            return stringResponse;                 
        }
        
        if(invalid) { // SE EXISTIR ALGUM PEDIDO ABERTO RETORNA MENSAGEM DE ERRO
            StringResponse stringResponse = new StringResponse("Item ID: " + id + " faz parte de um pedido aberto e não pode ser arquivado.", false);
            return stringResponse;
        }else { // SE EXISTIREM APENAS PEDIDOS FECHADOS, ARQUIVA ITEM
            item.setArquivado(true);
            repositoryItem.save(item);
            StringResponse stringResponse = new StringResponse("Item ID: " + id + " ARQUIVADO com sucesso.", true);
            return stringResponse;
        }       
    } 
}   
