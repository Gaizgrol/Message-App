class Chat
{
    /**
     * Monta os dados de uma conversa e recebe o usuário com o qual conversaremos
     * 
     * @param { User } otherUser
     */
    constructor( otherUser )
    {
        this._otherUser = otherUser;

        /**@type { Message[] }*/
        this._messages = [];
    }

    /**
     * Adiciona uma ou mais mensagens aos no final da conversa
     * 
     * @param { ...Message } msg
     */
    addMessage( ...msg )
    {
        this._messages.push( ...msg );
    }

    /**
     * Cria uma visualização em HTML de uma conversa
     * 
     * @param { boolean } sent
     * @returns { HTMLDivElement }
     */
    toHTMLElement()
    {
        const lastMsg = this._messages[ this._messages.length - 1 ];
        const lastMsgSentByMe = ( lastMsg.userId == webApp.data.user.id );
        // Mensagens não vistas
        const notSeen = 0; // #TODO

        // Cria elemento
        const el = document.createElement('div');
        // Cuida de ID e classes
        el.id = `chat-${ this._otherUser.id }`
        el.classList.add( 'user', 'flex-row' );
        // Conteúdo
        el.innerHTML = `<div class="user-info">
                            <h3>${this._otherUser.name}</h3>
                            ${ lastMsg ? `<p>${ lastMsgSentByMe ? '<span class="you">Você:</span>' : '' } ${ lastMsg.content }</p>` : '' }
                        </div>
                        <span class="badge seen">${ notSeen }</span>
                        `;
        return el;
    }

    get user()
    {
        return this._otherUser;
    }

    get messages()
    {
        return [...this._messages];
    }
}