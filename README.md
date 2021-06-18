# :e-mail: Message-App


## :memo: Descrição

### :raising_hand: Motivação

O **Message-App** é um projeto de conversa em tempo real por texto pelo navegador, tendo como objetivo treinar modelagem de sistemas, integração de microsserviços, e boas práticas de desenvolvimento de software.

---

![Imagem](https://static.wixstatic.com/media/af86ec_5850213055aa4ae8a4ecd4195d65d08d~mv2.png/v1/fill/w_154,h_22,al_c,q_85,usm_0.66_1.00_0.01/logo.webp)

* Este é um projeto da [**Resilia Educação**](https://www.resilia.work/) desenvolvido iterativamente no nosso [*canal da Twitch*](https://www.twitch.tv/resiliaeducacao)!
* Toda sexta às 18h30 nós conversamos sobre o projeto e implementamos funcionalidades novas!
* Além dos motivos mencionados acima, nós também queremos trazer a experiência do dia a dia de uma pessoa desenvolvedora: Planejamentos, pesquisas,  descobertas, conversas, erros e programação!

---

### :microscope: Divisão da aplicação
O projeto é dividido em 3 serviços principais: uma interface web *sem a utilização de frameworks* (planejamos utilizar alguma em iterações futuras); uma API conectada à um banco de dados `MySQL`, disponibilizada através de um servidor HTTP feito em `node.js` e um servidor de WebSockets para entregar uma comunicação em tempo real para a nossa interface, também feito em `node.js`.

### :monocle_face: Mais detalhes sobre os componentes do projeto
Informações mais detalhadas sobre os serviços estão disponíveis nos links abaixo:

* :computer: [Interface](./src/web-app/)
* :gear: [API](./src/message-app-api/)
* :radio: [Servidor de WebSockets](./src/ws-server/)

---


## :books: Dependências

O projeto foi projetado para ser executado em um ambiente com:
* `node v14.17.1`
* `npm 6.14.13`
* `mysql 8.0.7`
* `Firefox 89.0.1` ou outro navegador com suporte à [Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API) e [WebSockets API](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets_API)

*:warning: Aviso: É possível utilizar versões menores que as especificadas, porém não recomendamos pois podem ocorrer possíveis inconsistências e lançamento de erros na hora da execução (por exemplo, `node` < `14.0.0` não possui suporte para [operadores de coalescência nula](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)).*

---


## :hammer_and_pick: Instalação

### :computer: Interface
> Não é necessária a instalação da interface

### :gear: API
* Execute dentro da pasta `src/message-app-api/`:
  ```
  npm install
  ```
* Inicie o serviço do `MySQL` em sua máquina
* Crie um banco de dados `message_app_development`
* Após a instalação execute dentro da pasta `src/message-app-api/database`:
  ```
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
  ```

### :radio: Servidor de WebSockets
> **#TODO**: Ainda não está pronto!

## :white_check_mark: Execução


### :computer: Interface
* Abrir o arquivo `src/web-app/index.html` em um navegador

### :gear: API
* Execute dentro da pasta `src/message-app-api/`:
  ```
  npm start
  ```

### :radio: Servidor de WebSockets
> **#TODO**: Ainda não está pronto!
