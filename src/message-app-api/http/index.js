const express = require( 'express' );
const { MessagesController, UsersController } = require( './controllers' );
const { wrap } = require( './wrappers/decorators' );
const { cors, json, urlencoded } = require( './wrappers/middlewares' );

const app = express();

// Middlewares globais
app.use(
    cors({ origin: ['http://127.0.0.1:5500', 'http://localhost:5500'] }),
    json(),
    urlencoded({ extended: true }) 
);

// Rotas principais
app.get( '/user/data', wrap( UsersController.startingData ) );
app.post( '/message', wrap( MessagesController.create ) );

// Outras rotas
app.get( '/ping', (_, res) => res.status( 200 ).json({ message: 'Pong!' }) );

module.exports = app;
