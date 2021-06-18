const db = require( '../../database/models/' );

class MessagesController
{
    static async create( req, res )
    {
        const message = 'Salve!';
    
        res.status( 201 ).json({ message });
    }
}

module.exports = MessagesController;