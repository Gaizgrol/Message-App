class SocketService
{
    constructor( url )
    {
        this._connection = new WebSocket( url );
        this._connection.onmessage = this.receiveMessage;
    }

    /**
     * Método responsável pela recepção de dados do servidor
     * 
     * @param { MessageEvent<any> } event 
     */
    receiveMessage( event )
    {
        console.log( 'recebi' );

        const data = JSON.parse( event.data );
        console.log( data );
        
        const msg = new Message( data.message.content, data.message.userId, data.message.chatId );

        webApp.onMessage( msg );
    }

    /**
     * Método responsável pelo envio de dados para o servidor
     * 
     * @param { Message } msg 
     */
    sendMessage( msg )
    {
        // Monta o pacote de acordo com um modelo de mensagem
        const { chatId, content, userId } = msg;
        const body = { chatId, content, userId };

        // Serializa e envia para o servidor de sockets
        this.connection.send( JSON.stringify( body ) );

        console.log( 'enviei' );
    }

    get connection()
    {
        return this._connection;
    }
}