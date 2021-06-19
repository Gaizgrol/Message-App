const fetch = require( 'node-fetch' );
const WebSocket = require( 'ws' );

const wss = new WebSocket.Server({ port: 8080 }, () =>
{
    console.log( 'Servidor de WebSockets rodando!' );
});

// Conexões atualmente abertas
const connections = {};

/**
 * Registra uma conexão no mapa de conexões ativas caso ela não esteja registrada
 * 
 * @param {*} id
 * @param {*} connection
 */
const addConnection = ( id, connection ) =>
{
    // Se existem conexões desse usuário
    if ( connections[id]?.length )
    {
        let exists = false;
        for ( let openConnection of connections[id] )
            if ( connection == openConnection )
            {
                exists = true;
                break;
            }

        // Se a conexão não está lá dentro
        if ( !exists )
            connections[id].push( connection )
    }
    // Não há conexões desse usuário
    else
    {
        connections[id] = [ connection ];
    }
}

const removeConnection = connection =>
{
    // Todos os IDs conectados
    for ( let id in connections )
    {
        // Todas as conexões de cada ID
        let pos = -1;
        for ( let i=0; i<connections[id].length; i++ )
        {
            // Conexão lida
            const openConnection = connections[id][i];

            // Se a conexão lida é igual a queremos desconectar
            if ( connection == openConnection )
            {
                // Atualizamos a posição e saímos do loop
                pos = i;
                break;
            }
        }

        // Se achou a conexão
        if ( pos != -1 )
        {
            connections[id].splice( pos, 1 );
            break;
        }
    }
}

wss.on( 'connection', ( ws, request ) =>
{
    const userConnectionId = request.url.split('=')[1];

    // Adiciona conexão caso não exista
    addConnection( userConnectionId, ws );

    // Servidor recebeu mensagem
    ws.on( 'message', async msg =>
    {
        // Pega os dados da mensagem
        const { chatId, content, userId } = JSON.parse( msg );

        const body = { chatId, content, userId };

        // Faz a request pra API
        const response = await fetch( 'http://localhost:8000/message', {
            method: 'POST',
            body: JSON.stringify( body ),
            headers: { 'Content-Type': 'application/json' }
        });

        // Recebe os dados
        const data = await response.json();

        const userIds = data.chat.users.map( usr => usr.id );

        console.log( userIds );

        // Passa pelos IDs de todos os usuários que participam da conversa
        // que esta mensagem foi criada
        for ( const id of userIds )
        {
            // Caso o usuário atual esteja conectado
            if ( connections[id]?.length )
                // Mandar a mensagem para todas as suas conexões
                for ( const openConnection of connections[id] )
                    openConnection.send( JSON.stringify( data ) );
        }
    });


    // Ao desconectar, remove do mapa de conexões
    ws.on( 'close', () =>
    {
        removeConnection( ws );
    })
});