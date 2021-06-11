class MockService
{
    /**
     * @param { { fakeUser: User; chatRange: number[]; messagesRange: number[] } } options 
     */
    constructor( options )
    {
        this.configure( options );
    }

    /**
     * Configuração para criação dos dados falsos da aplicação
     * 
     * @param { { fakeUser: User; chatRange: number[]; messagesRange: number[] } } options 
     */
    configure( options )
    {
        this._fakeUser = options.fakeUser;
        this._fakeChatAmountRange = options.chatRange;
        this._fakeMessagesPerChatRange = options.messagesRange
    }

    /**
     * Gera os dados falsos da aplicação
     * 
     * @returns { { user: User; chats: Chat[] } }
     */
    generate()
    {
        const user = this._fakeUser;
        const chats = [];
        
        // Quantidade de conversas
        const cAmount = Math.round( Math.random() * ( this._fakeChatAmountRange[1] - this._fakeChatAmountRange[0] ) );
        
        // Dicionário de IDs de usuários já criados (evita repetição de IDs)
        const uids = new Set();

        // Gera as conversas
        for ( let c=1; c<=this._fakeChatAmountRange[0]+cAmount; c++ )
        {
            // Lista de mensagens da conversa atual
            const messages = [];
            
            // Quantidade de mensagens da conversa
            const mAmount = Math.round( Math.random() * ( this._fakeMessagesPerChatRange[1] - this._fakeMessagesPerChatRange[0] ) );
            let uid;
            do
            {
                // Gera um ID aleatório pra criar um usuário distinto para cada chat
                uid = Math.round( Math.random() * mAmount * 5 );
            }
            while( uids.has(uid) || uid == user.id ); // Tenta novamente caso ele exista ou se o ID for igual ao nosso
            uids.add( uid );                          // Registra novo ID criado

            // Gera o usuário da conversa
            const otherUser = new User( `User ${uid}`, uid );

            // Gera as mensagens da conversa
            for ( let m=1; m<=this._fakeMessagesPerChatRange[0]+mAmount; m++ )
            {
                const fromId = Math.random() > 0.5 ? 1 : uid;
                const toId = fromId == 1 ? uid : 1;
                messages.push( new Message( `Teste ${m}`, fromId, toId ) );
            }

            // Gera a conversa
            const chat = new Chat( otherUser );
            chat.addMessage( ...messages );

            chats.push( chat );
        }

        return { user, chats }
    }
}