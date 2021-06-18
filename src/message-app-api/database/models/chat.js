'use strict';
const { Model } = require('sequelize');

module.exports = ( sequelize, DataTypes ) =>
{
	class Chat extends Model
	{
		static associate( models )
		{
			Chat.hasMany( models.Message, { as: 'messages', foreignKey: 'chatId' } );
			Chat.belongsToMany( models.User, { as: 'users', foreignKey: 'chatId', otherKey: 'userId', through: 'ChatUsers' });
		}
	};

	Chat.init({
		name: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Chat',
	});

	return Chat;
};