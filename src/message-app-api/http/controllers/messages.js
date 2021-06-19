const db = require( '../../database/models/' );
const { Chat, Message, User } = db;

class MessagesController
{
    static async create( req, res )
    {
        // Busca dados da request
        const { chatId, content, userId } = { ...req.body };
        
        console.log( req.body );

        // Valida
        if ( !chatId || !content || !userId )
            return res.status( 400 ).json({ error: 'Um dos campos da requisição está faltando!' });

        // Cria a mensagem
        const message = await Message.create({ chatId, content, userId });
        
        // Adiciona os usuários pertencentes a conversa na response
        const chat = await Chat.findOne({
            attributes: [ 'id', 'name' ],
            where: { id: message.chatId },
            include: {
                model: User,
                as: 'users',
                attributes: [ 'id', 'name' ],
                through: { attributes: [] }
            }
        });
        
        
        res.status( 201 ).json({ message, chat });
    }
}

module.exports = MessagesController;