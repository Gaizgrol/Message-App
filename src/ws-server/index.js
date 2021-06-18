const fetch = require( 'node-fetch' );
const WebSocket = require( 'ws' );

const wss = new WebSocket.Server({ port: 8080 }, () =>
{
    console.log( 'Servidor de WebSockets rodando!' );
});

// Conexões atualmente abertas
const connections = {};

wss.on( 'connection', ( ws, request ) =>
{
    // Servidor recebeu mensagem
    ws.on( 'message', async msg =>
    {
        // Pega os dados da mensagem
        const body = JSON.parse( msg );

        // Faz a request pra API
        const response = await fetch( 'http://localhost:8000/message', {
            method: 'POST',
            body: JSON.stringify( body ),
            headers: { 'Content-Type': 'application/json' }
        });

        // Recebe os dados
        const data = await response.text();

        // Envia para o cliente
        ws.send( data );
    });
});