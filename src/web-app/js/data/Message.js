class Message
{
    /**
     * Remove espaços em branco antes e depois do conteúdo e sanitiza entrada (escapa tags HTML)
     * 
     * @param { string } str 
     * @returns { string }
     */
    static safe = str => safeTags( str.trim() );
    
    /**
     * @param { string } content 
     * @param { number } userId 
     * @param { number } toId
     */
    constructor( content, userId, toId )
    {
        this._data = Message.safe( content );
        this._uid = userId;
        this._toId = toId;
    }
    
    /**
     * Cria um elemento HTML de uma mensagem e altera seu estilo dependendo se o usuário enviou ou recebeu a mesma
     * 
     * @param { boolean } sent
     * @returns { HTMLParagraphElement }
     */
    toHTMLElement( sent )
    {
        // Cria elemento
        const el = document.createElement('p');
        // Configura classes
        if ( sent ) el.classList.add( 'sent' );
        el.classList.add( 'message' );
        // Conteúdo do elemento
        el.innerHTML = [...this.content].map( char => (char === '\n' ? '<br>' : char) ).join('');

        return el;
    }

    get content()
    {
        return this._data;
    }

    get userId()
    {
        return this._uid;
    }

    get targetId()
    {
        return this._toId;
    }
}