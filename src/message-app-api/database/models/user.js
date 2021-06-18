'use strict';
const { Model } = require('sequelize');

module.exports = ( sequelize, DataTypes ) =>
{
	const { Chat, Message } = sequelize.models;

	class User extends Model
	{
		static associate( models )
		{
			User.hasMany( models.Message, { as: 'messages', foreignKey: 'userId' } );
			User.belongsToMany( models.Chat, { as: 'chats', foreignKey: 'userId', otherKey: 'chatId', through: 'ChatUsers' });
		}

		static startingData( id )
		{
			return User.findOne({
				where: { id },
				// Dados do usuário
				attributes: [ 'id', 'name' ],
		
				// Todas as conversas
				include: {

					model: Chat,
					as: 'chats',

					// Dados das conversas
					attributes: [ 'id', 'name' ],
					
					// Todas as mensagens e usuários que participam da conversa
					include:[{
						model: Message,
						as: 'messages'
					}],

					// Não inclui a tabela pivô
					through: { attributes: [] }
				}
			});
		}
	};

	User.init({
		name: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'User',
	});
	
	return User;
};
