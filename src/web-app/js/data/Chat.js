class Chat
{
    /**
     * Monta os dados de uma conversa
     * 
     * @param { number } id
     * @param { ...User } users
     */
    constructor( id, ...users )
    {
        this._id = id;
        this._users = users;
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
        const me = webApp.data.user;
        const lastMsgSentByMe = ( lastMsg.userId == me.id );
        // Mensagens não vistas
        const notSeen = 0; // #TODO

        // Cria elemento
        const el = document.createElement('div');
        // Cuida de ID e classes
        el.id = `chat-${ this.id }`
        el.classList.add( 'user', 'flex-row' );
        // Conteúdo
        el.innerHTML = `<div class="user-info">
                            <h3>${this.name(me)}</h3>
                            ${ lastMsg ? `<p>${ lastMsgSentByMe ? '<span class="you">Você:</span>' : '' } ${ lastMsg.content }</p>` : '' }
                        </div>
                        <span class="badge seen">${ notSeen }</span>
                        `;
        return el;
    }

    /**
     * Gera o nome da conversa baseado em qual usuário você é
     * 
     * @param { User } me
     * @returns 
     */
    name( me )
    {
        return this._users.reduce( (name, usr) => usr.id != me.id ? `${name} ${usr.name}` : name, '' );
    }

    get id()
    {
        return this._id;
    }

    get messages()
    {
        return [...this._messages];
    }
}