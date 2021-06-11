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
         * @type { { api: APIService } }
         */
        this.services =
        {
            api: new APIService( 'http://localhost:8000/api/' )
        };
    }

    /**
     * Função executada após o DOM carregar: Ponto inicial da aplicação.
     */
    async onLoad()
    {
        // Autentica na plataforma e pega os dados do usuário
        const userData = await this.services.api.getUserData();

        // Se há dados, usuário autenticado
        if ( userData )
        {
            // Salva os dados na aplicação
            this.data.user = userData.user;
            this.data.chats = userData.chats;

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
        const selected = webApp.data.selectedChat;
        const myId = webApp.data.user.id;

        /**@type { Chat }*/
        let chat;

        // Eu enviei a mensagem
        if ( msg.userId == myId )
        {
            chat = this.data.chats[ msg.targetId ];

            // Conversa selecionada
            if ( selected == msg.targetId )
                this.components.messages.appendMessage( msg );
        }
        // Eu recebi a mensagem
        else
        {
            chat = this.data.chats[ msg.userId ];

            // Conversa selecionado
            if ( selected == msg.userId )
                this.components.messages.appendMessage( msg );
        }

        // Adiciona a mensagem nos dados da conversa e atualiza a última mensagem
        chat.addMessage( msg );
        this.components.chat.updateLastMessage( chat );
    }
}
