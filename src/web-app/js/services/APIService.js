class APIService
{
    constructor( baseURL )
    {
        this._apiURL = baseURL;

        // Gerador de dados falsos enquanto não temos integração com a API
        this._mock = new MockService({
            fakeUser: new User( 'Mock User', 1 ),
            chatRange: [ 5, 50 ],
            messagesRange: [ 5, 50 ]
        });
    }

    /**
     * Busca os dados do usuário autenticado na API
     * 
     * @returns { Promise<{ user: User; chats: { [key: number]: Chat } } | null> }
     */
    async getUserData()
    {
        // Substituiremos por um fetch para a API no futuro
        const data = await new Promise( resolve => setTimeout( () => resolve( this._mock.generate() ), 1000 ) ); // #TODO
        
        /**@type { Chat[] }*/
        const chats = data.chats;

        // Converte array de Chat para um dicionário number -> Chat
        const chatDict = chats.reduce( ( dict, ch ) => { dict[ ch.id ] = ch; return dict; }, {});

        console.log( chatDict );

        return {
            user: data.user,
            chats: chatDict
        };
    }
}