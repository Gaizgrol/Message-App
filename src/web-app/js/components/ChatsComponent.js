class ChatsComponent
{
    constructor()
    {
        /**@type { HTMLElement }*/
        this._chatContainer = null;
        
        /**@type { HTMLElement[] }*/
        this._chatArray = [];
    }


    /**
     * Procura os elementos do DOM e registra escutas de evento
     */
    onLoad()
    {
        // Busca elemento que comportará as conversas
        this._chatContainer = $_( 'chats' );
        
        // Gera os elementos das conversas e adiciona listeners
        Object.values( webApp.data.chats ).forEach( chat =>
        {
            const el = chat.toHTMLElement();
            this._chatContainer.appendChild( el );

            el.addEventListener( 'click', () =>
            {
                this.onChatSelect( chat );
            });
        });
    }

    /**
     * Lida com o caso do chat ser clicado
     * 
     * @param {Chat} chat 
     */
    onChatSelect( chat )
    {
        const id = chat.user.id;
        const oldChatId = webApp.data.selectedChat;

        // Desmarca a conversa anterior caso esteja marcada
        if ( oldChatId != -1 )
            $_( `chat-${oldChatId}` ).classList.remove( 'selected' );


        // Seleciona a nova conversa
        $_( `chat-${id}` ).classList.add( 'selected' );
        webApp.data.selectedChat = id;

        // Carrega as mensagens da conversa
        webApp.components.messages.loadTab( chat );
    }

    /**
     * Atualiza a última mensagem da conversa no display lateral
     * 
     * @param { Chat } chat
     */
    updateLastMessage( chat )
    {
        // Pega última mensagem do chat
        const msg = chat.messages[ chat.messages.length - 1 ];

        // Busca o elemento e atualiza com a última mensagem chat
        $_( `chat-${ chat.user.id }` ).querySelector('p').innerHTML = `${
            msg.userId == webApp.data.user.id ? '<span class="you">Você:</span>' : ''
        } ${
            msg.content
        }`;
    }
}