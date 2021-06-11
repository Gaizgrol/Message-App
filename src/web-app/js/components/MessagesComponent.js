class MessagesComponent
{
    constructor()
    {
        /**@type { HTMLElement }*/
        this._chatTab = null;
        /**@type { HTMLElement }*/
        this._chatName = null;
        /**@type { HTMLElement }*/
        this._msgs = null;
        /**@type { HTMLElement }*/
        this._sendMsg = null;
        /**@type { HTMLElement }*/
        this._writeMsg = null;
    }
    
    /**
     * Procura os elementos do DOM e registra escutas de evento
     */
    onLoad()
    {
        // Carrega elementos
        this._chatTab = $_( 'chat-tab' );
        this._chatName = $_( 'chat-name' );
        this._msgs = $_( 'messages' );
        this._sendMsg = $_( 'send-message' );
        this._writeMsg = $_( 'message-input' );

        // Função para enviar a mensagem
        const send = () =>
        {
            // Busca os dados necessários
            const content = this._writeMsg.value;
            const id = webApp.data.user.id;

            // Envia a mensagem e limpa a entrada
            webApp.onMessage( new Message( content, id, webApp.data.selectedChat ) );
            this.clearInput();
        };

        // Adiciona escutas de eventos de clique/tecla apertada para enviar a mensagem
        this._sendMsg.addEventListener( 'click', send );
        this._writeMsg.addEventListener( 'keypress', ev =>
        {
            // Envia a mensagem caso apertem Enter sem o Shift pressionado
            if ( !ev.shiftKey && ev.key == 'Enter' )
            {
                send();
                // Evita adicionar uma quebra de linha extra na entrada
                ev.preventDefault();
            }
        });
    }

    /**
     * Mostra a aba de mensagens
     */
    show()
    {
        this._chatTab.style.display = 'flex';
    }


    /**
     * Muda o nome da aba pra o nome do usuário no qual você está conversando
     * 
     * @param {string} name 
     */
    changeName( name )
    {
        this._chatName.textContent = name;
    }


    /**
     * Limpa a listagem de mensagens
    */
    clearMessages()
    {
        this._msgs.textContent = '';
    }


    /**
     * Limpa o a área de entrada
    */
    clearInput()
    {
        this._writeMsg.value = '';
    }


    /**
     * Carrega os dados da conversa na aba
     * 
     * @param { Chat } chat 
     */
    loadTab( chat )
    {
        const me = webApp.data.user;

        this.show();
        this.changeName( chat.name(me) );
        
        this.clearInput();
        this.clearMessages();
        
        const messages = chat.messages;

        // Adiciona as mensagens no DOM
        for ( const msg of messages )
            this._msgs.appendChild( msg.toHTMLElement( me.id === msg.userId ) );
        
        // Rola para o final da conversa
        this._msgs.scroll({ top: this._msgs.scrollHeight });
    }


    /**
     * Adiciona visualmente uma mensagem no final da conversa
     * 
     * @param { Message } msg
     */
    appendMessage( msg )
    {
        const msgs = this._msgs;

        if ( msg.content )
        {
            // Se a mensagem não é vazia, adicione-a
            msgs.appendChild( msg.toHTMLElement( webApp.data.user.id === msg.userId ) );
            // Role para baixo suavemente
            msgs.scroll({
                top: msgs.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
}