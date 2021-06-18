class APIService
{
    constructor( baseURL )
    {
        this._apiURL = baseURL;
    }

    /**
     * Busca os dados do usuário autenticado na API
     * 
     * @param { number } userId
     * @returns { Promise<{ user: User; chats: { [key: number]: Chat } } | null> }
     */
    async getUserData( userId )
    {
        const response = await fetch( `${this._apiURL}/user/data?id=${ userId }` );
        const data = await response.json();
        
        /**@type { Chat[] }*/
        const chats = data.chats.map( rawChat =>
        {
            // JSON Usuários -> Model Usuários
            const users = rawChat.users.map( rawUsr => new User( rawUsr.name, rawUsr.id ) );
            // JSON Mensagens -> Model Mensagens
            const messages = rawChat.messages.map( rawMsg => new Message( rawMsg.content, rawMsg.userId, rawMsg.chatId ) );
            // JSON Conversa -> Model Conversa
            const chat = new Chat( rawChat.id, ...users );
            chat.addMessage( ...messages );

            return chat;
        });

        // Converte array de Chat para um dicionário number -> Chat
        const chatDict = chats.reduce( ( dict, ch ) => { dict[ ch.id ] = ch; return dict; }, {});

        return {
            user: data.user,
            chats: chatDict
        };
    }
}