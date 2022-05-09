CRUD Desenvolvido por Victor Padilha para desafio.

Front-end desenvolvido em usando Angular e Angular Material.

API desenvolvida em Spring Boot e com o banco de dados PostgreSQL.

A maioria dos dados são validados tanto no front, quanto no back end. 

Qualquer Dúvida, Sugestão ou se deseja reportar algum bug, envie um e-mail para victorportopadilha@gmail.com


INSTALAÇÃO:

FRONT-END

1 - Baixe e instale o Node (nodejs.org/en/download/)

2 - No prompt de comando da sua máquina, instale o angular/cli com o seguinte comando:

	npm install -g @angular/cli

3 - Também no prompt de comando, navegue para a pasta root do projeto (crud-angular-springBoot), e execute o comando 

	npm install

4 - Ainda no prompt de comando rode o comando

	ng serve

4 - Usando o seu navegador, acesse http://localhost:4200/

API

(Propriedades da conexão podem ser configuradas em: crud-angular-springBoot\api\src\main\resources\templates\application.properties)

1 - Baixe (www.postgresql.org/download/), instale e suba um banco PostgreSQL na porta 5432.


2 - Baixe o Spring Tools 4 (JRE 11+) (https://spring.io/tools) e rode o entry point da API RestApiCrudDesafioApplication.java em: crud-angular-springBoot\api\src\main\java\com\restapidesafio\boot\restapicruddesafio\


3 - Servidor irá rodar no localhost:8080


4 - Caso deseje testar a API sem um front-end, as requisições devem ser feitas para o localhost:8080/itens e localhost:8080/pedido . Use o arquivo .postman_collection 
como base para as requests. O UUID de um Pedido ou Item deve ser provido na url, por exemplo: localhost:8080/itens/033b8430-7e68-4bd1-b760-29cf42239a45

 





 	

