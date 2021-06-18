const { User } = require( '../../database/models/' );

class UsersController
{
    static async startingData( req, res )
    {
        // Id enviado nos query parameters
        const myId = req.query.id;

        // Busca os dados do usuário
        const data = await User.startingData( myId );

        // Não encontrado
        if ( !data )
            return res.status( 404 ).json({ error: 'Usuário não encontrado!' });

        // Estrutura a resposta
        const { chats } = data;
        const { id, name } = data;
        const user = { id, name };

        res.status( 200 ).json({ user, chats });
    }
}

module.exports = UsersController;