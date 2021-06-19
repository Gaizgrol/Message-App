class Application
{
    constructor()
    {
        /**
         * Dados globais
         * 
         * @type { { user: User; chats: { [key: number]: Chat }; selectedChat: number } }
         */
        this.data =
        {
            user: null,
            chats: {},
            selectedChat: -1,
        };

        /**
         * Visualização
         * 
         * @type { { chat: ChatsComponent; messages: MessagesComponent } }
         */
        this.components =
        {
            chat: new ChatsComponent(),
            messages: new MessagesComponent()
        };

        /**
         * Integração
         * 
         * @type { { api: APIService; socket: SocketService } }
         */
        this.services =
        {
            api: new APIService( 'http://127.0.0.1:8000' ),
            socket: new SocketService()
        };
    }

    /**
     * Função executada após o DOM carregar: Ponto inicial da aplicação.
     */
    async onLoad()
    {
        const url = new URL( window.location );
        const usrId = (new URLSearchParams( url.search )).get( 'id' );

        // Autentica na plataforma e pega os dados do usuário
        const userData = await this.services.api.getUserData( usrId );

        // Se há dados, usuário autenticado
        if ( userData )
        {
            // Salva os dados na aplicação
            this.data.user = userData.user;
            this.data.chats = userData.chats;

            this.services.socket.connect( `ws://127.0.0.1:8080?userId=${userData.user.id}` );

            // Oculta o texto de carregamento
            $_( 'loading' ).style.display = 'none';

            // Inicia os componentes
            Object.values( this.components ).forEach( v => v.onLoad() );
        }
        else
        {
            // Não autenticado redirecione para o login
            window.location = 'https://google.com'; // #TODO
        }
    }
    
    /**
     * Método que irá lidar com as mensagens recebidas na aplicação
     * 
     * @param { Message } msg 
     */
    onMessage( msg )
    {
        const selected = this.data.selectedChat;
        const myId = this.data.user.id;

        /**@type { Chat }*/
        let chat = this.data.chats[ msg.chatId ];

        // Conversa selecionada
        if ( selected == msg.chatId )
            this.components.messages.appendMessage( msg );

        // Adiciona a mensagem nos dados da conversa e atualiza a última mensagem
        chat.addMessage( msg );
        this.components.chat.updateLastMessage( chat );
    }
}
