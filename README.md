# :e-mail: Message-App :e-mail:


## :memo: Descrição

### :raising_hand: Motivação
O **Message-App** é um projeto de conversa em tempo real por texto pelo navegador, tendo como objetivo treinar modelagem de sistemas, integração de microsserviços, e boas práticas de desenvolvimento de software.

### :microscope: Tecnologias utilizadas
O projeto é dividido em 3 serviços principais: uma interface feita com `HTML`, `CSS` e `JavaScript` *sem a utilização de frameworks*; uma API conectada à um banco de dados `MySQL`, disponibilizada através de um servidor HTTP feito em `node.js` e um servidor de WebSockets para entregar uma comunicação em tempo real para a nossa aplicação, também feito em `node.js`.

### :monocle_face: Mais detalhes sobre os componentes do projeto
Informações mais detalhadas sobre os serviços estão disponíveis nos links abaixo:

* :computer: [Interface](./src/web-app/)
* :gear: [API](./src/api/)
* :gear: [Servidor de WebSockets](./src/ws-server/)

---


## :books: Dependências

O projeto foi desenvolvido com:
* `node` **≥** `10.16.0`
* `npm` **≥** `6.9.0`
* `mysql` **≥** `8.0.7`
* Navegador com suporte a `WebSockets`

É possível utilizar versões menores que as especificadas, porém não recomendo pois podem ocorrer possíveis inconsistências na hora da execução.

---


## :hammer_and_pick: Instalação

### :computer: Interface
* > Não é necessária a instalação da interface, dado que ela é carregada como arquivos estáticos no navegador.

### :gear: API
* > OBS: Ainda não está pronta!
* Dentro da pasta `src/api/`, executar
  ```
  npm install
  ```

### :gear: Servidor de WebSockets
* > OBS: Ainda não está pronto!
* Dentro da pasta `src/ws-server/`, executar
  ```
  npm install
  ```

## :white_check_mark: Execução
* > OBS: Ainda não está pronto!

### :computer: Interface
* Abrir o arquivo `src/web-app/index.html` em um navegador

### :gear: API
* > OBS: Ainda não está pronta!
* Dentro da pasta `src/api/`, executar
  ```
  npm start
  ```

### :gear: Servidor de WebSockets
* > OBS: Ainda não está pronta!
* Dentro da pasta `src/ws-server/`, executar
  ```
  npm start
  ```