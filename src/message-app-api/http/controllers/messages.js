const db = require( '../../database/models/' );
const { Message } = db;

class MessagesController
{
    static async create( req, res )
    {
        // Busca dados da request
        const { chatId, content, userId } = { ...req.body };

        // Valida
        if ( !chatId || !content || !userId )
            return res.status( 400 ).json({ error: 'Um dos campos da requisição está faltando!' });

        // Cria a mensagem
        const message = await Message.create({ chatId, content, userId });
        
        res.status( 201 ).json({ message });
    }
}

module.exports = MessagesController;