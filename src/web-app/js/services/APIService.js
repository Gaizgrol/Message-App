class APIService
{
    constructor( baseURL )
    {
        this._apiURL = baseURL;

        // Gerador de dados falsos enquanto não temos integração com a API
        /*this._mock = new MockService({
            fakeUser: new User( 'Mock User', 1 ),
            chatRange: [ 5, 50 ],
            messagesRange: [ 5, 50 ]
        });*/
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
        
        console.log( 'Cheguei aqui' );
        
        const data = await response.json();
        
        console.log( data );
        
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