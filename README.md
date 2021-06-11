# :e-mail: Message-App :e-mail:


## :memo: Descrição

O projeto **Message-App** é dividido em 3 serviços principais. Informações mais detalhadas sobre os serviços estão disponíveis nos links abaixo:
* :computer: [Interface](./src/web-app/README.md)
* :gear: [API](./src/api/README.md)
* :gear: [Servidor de WebSockets](./src/ws-server/README.md)

---


## :books: Dependências

O projeto foi desenvolvido com:
* `node` **≥** `10.16.0`
* `npm` **≥** `6.9.0`
* `mysql` **≥** `8.0.7`
* Navegador com suporte a WebSockets

É possível utilizar versões menores que as utilizadas porém não é recomendado, devido à possíveis inconsistências de execução.

---


## :hammer_and_pick: Instalação

### :computer: Interface
* > Não é necessária a instalação da interface, dado que ela é carregada como arquivo estático no navegador

### :gear: API
* Dentro da pasta `src/api/`, executar
  ```
  npm install
  ```

### :gear: Servidor de WebSockets
* Dentro da pasta `src/ws-server/`, executar
  ```
  npm install
  ```

## :white_check_mark: Execução

### :computer: Interface
* Abrir o arquivo `src/web-app/index.html` em um navegador

### :gear: API
* Dentro da pasta `src/api/`, executar
  ```
  npm start
  ```

### :gear: Servidor de WebSockets
* Dentro da pasta `src/ws-server/`, executar
  ```
  npm start
  ```