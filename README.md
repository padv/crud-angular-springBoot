# CRUD Desenvolvido por Victor Padilha para desafio.

## Front-end desenvolvido em usando Angular e Angular Material.

## API desenvolvida em Spring Boot e com o banco de dados PostgreSQL.

A maioria dos dados são validados tanto no front, quanto no back end. 

**Como é um projeto para fins didáticos, mesmo sendo uma prática que vai contra os padrões de segurança, resolvir expor a UUID das entradas da tabela no front-end para que fique mais claro as nuances da aplicação. **

**Qualquer Dúvida, Sugestão ou se deseja reportar algum bug, envie um e-mail para victorportopadilha@gmail.com**


# INSTALAÇÃO:

## FRONT-END

1 - Baixe e instale o Node (nodejs.org/en/download/)

2 - No prompt de comando da sua máquina, instale o angular/cli com o seguinte comando:

	npm install -g @angular/cli

3 - Também no prompt de comando, navegue para a pasta root do projeto (crud-angular-springBoot), e execute o comando 

	npm install

4 - Ainda no prompt de comando rode o comando

	ng serve

5 - Usando o seu navegador, acesse http://localhost:4200/

## API

**Servidor está configurado para limpar todas as tabelas do banco de dados toda vez que for reiniciado. Caso deseje que isso não aconteça, comente a linha 10  do application.properties em \api\src\main\resources\templates\ (Outras propriedades da conexão com o banco de dados também podem ser configuradas nesse arquivo)**

1 - Baixe (www.postgresql.org/download/), instale e suba um banco PostgreSQL na porta 5432. Banco postgres Usuário postgres senha root

2 - Baixe o Spring Tools 4 (JRE 11+) (https://spring.io/tools) e rode o entry point da API **RestApiCrudDesafioApplication.java** em: crud-angular-springBoot\api\src\main\java\com\restapidesafio\boot\restapicruddesafio\

**(Se estiver usando o VS Code, é possível que seja nescessário instalar a extensão: "Lombok Annotations Support for VS Code" para evitar problemas com os Setters e Getters)**

3 - Servidor irá rodar no localhost:8080

4 - Caso deseje testar a API sem um front-end, as requisições devem ser feitas para o localhost:8080/itens e localhost:8080/pedido . Caso seja uma requisição envolvendo um Item ou Pedido específico, o UUID de um Pedido ou Item deve ser provido na url, por exemplo: 

  localhost:8080/itens/033b8430-7e68-4bd1-b760-29cf42239a45 
  
Você também pode usar o arquivo .postman_collection, localizado no root do projeto, como base para as requests. 

 





 	

