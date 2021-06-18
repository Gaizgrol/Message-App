'use strict';
const { Model } = require('sequelize');

module.exports = ( sequelize, DataTypes ) =>
{
	class Message extends Model
	{
		static associate( models )
		{
			Message.belongsTo( models.User, { as: 'user' } );
			Message.belongsTo( models.Chat, { as: 'chat' } );
		}
	};

	Message.init({
		content: DataTypes.STRING,
		userId: DataTypes.INTEGER,
		chatId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Message',
	});

	return Message;
};